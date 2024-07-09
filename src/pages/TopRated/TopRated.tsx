import { Container } from "./TopRated.style"
import { ReactComponent as BackArrow } from "../../assets/back-arrow.svg";
import { ReactComponent as StarIcon } from "../../assets/star.svg"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Title } from "../Title/Title";
import axios from "axios";
import { splitParagraph, transformLongText } from "../../util";
import config from "../../config";
interface TopRatedProps {
    isNavBarHidden: boolean
}
export default function TopRated({ isNavBarHidden }: TopRatedProps) {
    const [data, setData] = useState<Title[]>();
    useEffect(() => {
        const getTopRated = async () => {
            try {
                const response = await axios.get(`${config.apiUrl}/api/manga/top-rated?numberOfItem=9`);
                if (response.data) {
                    setData(_prev => response.data)
                }
            }
            catch(error) {
                console.log(error)
            }
        }
        getTopRated();
    }, [])
    const navigate = useNavigate();
    return (
        <Container isNavBarHidden={isNavBarHidden}>
                <div id="top-bar">
                    <BackArrow width='26' height='26' id="back-arrow"  onClick={() => navigate(-1)}/>
                    <div>Top Rated</div>
                </div>
                <div className="manga-list">
                    {data?.map(item => {
                        return (
                            <Link key={item.id} to={`/title/${item.id}`} className="list-item">
                                <div className="img-container" data-summary={transformLongText(splitParagraph(item.summary)[0], 200)}>
                                    <img src={item.imageUrl} alt=""/>
                                    <div className="rating-container">
                                        <StarIcon width='16' height='16'/>
                                        <span className="rating">{item.rating}</span>
                                    </div>
                                </div>
                                <div className="name">{item.title}</div>
                            </Link>
                        )
                    })}
                </div>
            </Container>
    )
}