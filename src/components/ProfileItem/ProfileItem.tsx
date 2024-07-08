import { Container } from "./ProfileItem.style";
import TagContainer from "../TagContainer/TagContainer";
import StatsContainer from "../StatsContainer/StatsContainer";
import StatusTag from "../StatusTag/StatusTag";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios, { Axios, AxiosResponse } from "axios";
import { Title } from "../../pages/Title/Title";
import { splitParagraph } from "../../util";
const tagIds = ['a737c13c-fe8b-4497-86bb-1ed1478f4985', 'e2217f05-4350-4ed2-ae6f-9e9f6db56eb1', '0d50d54d-f0cf-47cd-b1be-78f3d40691ce', 'a737c13c-fe8b-4497-86bb-1ed1478f4985', 'e2217f05-4350-4ed2-ae6f-9e9f6db56eb1', '0d50d54d-f0cf-47cd-b1be-78f3d40691ce', 'a737c13c-fe8b-4497-86bb-1ed1478f4985', 'e2217f05-4350-4ed2-ae6f-9e9f6db56eb1', '0d50d54d-f0cf-47cd-b1be-78f3d40691ce'];
interface ProfileItemProps {
    mangaId: string
}
export default function ProfileItem({ mangaId }: ProfileItemProps) {
    const [isOverflow, setIsOverflow] = useState<boolean>(false);
    const [item, setItem] = useState<Title>();
    const summaryRef = useRef<HTMLElement | null>(null);
    const tagsRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const contentHeight = window.innerWidth > 580 ? 135 : 116;
        const rowGap = window.innerWidth > 580 ? 5 : 3;
        const titleHeight= 25;
        setTimeout(() => {
            if ((summaryRef.current as HTMLElement).offsetHeight > contentHeight - (titleHeight + 3 * rowGap + (tagsRef.current as HTMLDivElement).offsetHeight) || (window.innerWidth < 580 && (summaryRef.current as HTMLElement).offsetHeight > 41)) {
                setIsOverflow(prev => true)
            }
        }, 500)
        const fetchManga = async() => {
            try {
                const response: AxiosResponse = await axios.get(`https://localhost:7245/api/manga/${mangaId}`);
                if (response.data)
                    setItem(response.data as Title)
            }
            catch(error) {
                console.log(error)
            }
        }
        fetchManga()
    }, []) 

    return (
        <Container isOverflow={isOverflow} to={`/title/${mangaId}`}>
            <img src={item?.imageUrl} className="title-img"></img>
            <div className="name">{item?.title}</div>
            <div className="stats">
                <StatsContainer ratingScore={item?.rating} follow={item?.follows}>
                    <StatusTag status="Completed"/>
                </StatsContainer>
            </div>
            <div className="tags" ref={tagsRef}>
                <TagContainer tagIds={item?.tagIds}/>
            </div>
            <section className="summary" ref={summaryRef}>
                {item ? splitParagraph(item.summary).map((paragraph) => {
                        return <p>{paragraph}</p>
                }) : "No summary"}
            </section>
        </Container>
    )
}