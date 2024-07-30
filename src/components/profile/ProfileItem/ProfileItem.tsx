import { Container } from "./ProfileItem.style";
import TagContainer from "../../TagContainer/TagContainer";
import StatsContainer from "../../StatsContainer/StatsContainer";
import { useEffect,  useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Title } from "../../../types";
import { splitParagraph } from "../../../util";
import config from "../../../config";
import StatusBadge from "../../StatusBadge/StatusBadge";

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
                setIsOverflow(_prev => true)
            }
        }, 500)
        const fetchManga = async() => {
            try {
                const response: AxiosResponse = await axios.get(`${config.apiUrl}/api/manga/${mangaId}`);
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
                    <StatusBadge status={item?.status}/>
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