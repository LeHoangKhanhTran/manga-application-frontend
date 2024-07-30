import { Container } from "./TopRated.style"
import { ReactComponent as BackArrow } from "../../assets/back-arrow.svg";
import { ReactComponent as StarIcon } from "../../assets/star.svg"
import { Link, useNavigate } from "react-router-dom";
import { Title } from "../../types";
import { splitParagraph, transformLongText } from "../../util";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/ui/Spinner/Spinner";
interface TopRatedProps {
    isNavBarHidden: boolean
}

const numberOfItem = 9;
export default function TopRated({ isNavBarHidden }: TopRatedProps) {
    const { data, loading } = useFetch<Title[]>(`/api/manga/top-rated?numberOfItem=${numberOfItem}`);
    const navigate = useNavigate();
    return (
        <Container isNavBarHidden={isNavBarHidden}>
                <div id="top-bar">
                    <BackArrow width='26' height='26' id="back-arrow"  onClick={() => navigate(-1)}/>
                    <div>Top Rated</div>
                </div>
                {!loading && 
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
                </div> }
                {loading && 
                    <div className="spinner-container" style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <Spinner size="2.5rem"/>
                    </div>
                }
                
            </Container>
    )
}