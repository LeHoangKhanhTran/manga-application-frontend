import { useNavigate, useParams } from "react-router-dom"
import { Container, TitleInfo } from "./Title.style";
import { ReactComponent as BookmarkIcon } from "../../assets/bookmark.svg";
import { ReactComponent as StarIcon } from "../../assets/star.svg";
import { ReactComponent as EyeIcon } from "../../assets/eye.svg";
import { ReactComponent as FollowedIcon } from "../../assets/followed.svg"
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { splitParagraph } from "../../util";
import { useUserContext } from "../../App";
import { getUser } from "../../App";
import TagContainer from "../../components/TagContainer/TagContainer";
import config from "../../config";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import { Title as TitleType } from "../../types";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner/Spinner";
interface TitleProps {
    isNavBarHidden: boolean
}

export default function Title({ isNavBarHidden } : TitleProps) {
    const { id } = useParams();
    const { data: title , loading, error } = useFetch<TitleType>(`api/manga/${id}`)
    const [rateActive, setRateActive] = useState<boolean>(false);
    const [userScore, setUserScore] = useState<number>(0)
    const [ratingScore, setRatingScore] = useState<number>(0);
    const { user, setUser } = useUserContext();
    const [follow, setFollow] = useState<number>(0);
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const navigate = useNavigate();
    
    useEffect(() => {
       if (title) {
            setRatingScore(title.rating)
            setFollow(title.follows)
       }
    }, [title]);

    useEffect(() => {
        const rating = user?.userRatings?.find(rating => rating.mangaId === id)
        if (rating) {
            setUserScore(_prev => rating.score)
        }
        else {setUserScore(_prev => 0)}
        setIsFollowed(_prev => user?.mangaFollows?.find(mangaId => mangaId === id) !== undefined)
    }, [user, id])
    
    const rateManga = async (score: number) => {
        if (!user) {
            navigate('../login')
        }
        const data = {
            userId: user?.id,
            score: score,
            previousScore: user?.userRatings?.find(rating => rating.mangaId === id) ? user?.userRatings?.find(rating => rating.mangaId === id)?.score : 0
        }
        try {
            const response: AxiosResponse = await axios.post(`${config.apiUrl}/api/manga/${id}/rating`, data);
            setRatingScore(_prev => response.data['updatedRating']);
            getUser(setUser);
        }
        catch(error) {
            console.log(error)
        }
        finally {
            setRateActive(_prev => false)
        }
    }
    const removeRate = async () => {
        if (!user) {
            navigate('../login')
        }
        const data = {
            userId: user?.id,   
            score: user?.userRatings?.find(rating => rating.mangaId === id)?.score,
        }
        try {
            const response: AxiosResponse = await axios.post(`${config.apiUrl}/api/manga/${id}/remove-rating`, data);
            setRatingScore(_prev => response.data['updatedRating'])
            getUser(setUser);
        }
        catch(error) {
            console.log(error)
        }
        finally {
            setRateActive(_prev => false)
        }
    }

    if (error) {
        console.log(error);
    }

    const handleFollow = async (follow: boolean) => {
        if (!user) {
            navigate('../login')
        }
        try {
            const response: AxiosResponse = await axios.post(`${config.apiUrl}/api/manga/${id}/${follow ? 'follow' : 'unfollow'}`, {userId: user?.id})
            setIsFollowed(_prev => follow)
            setFollow(_prev => response.data['updatedFollow'])
        }
        catch(error)
        {
            console.log(error);
        }
    }

    if (!loading) 
        return (
            <Container>
                <div className="title-banner" style={{backgroundImage: `url(${title?.imageUrl})`}}></div>
                <TitleInfo isNavBarHidden={isNavBarHidden} status={title?.status} hasRated={userScore > 0}>
                    <div className="background" style={{background: `radial-gradient(circle at top, rgb(40 42 54 / 0.8), rgb(40 42 54) 75%), no-repeat top 35% center / 100% url(${title?.imageUrl})`}}></div>
                    <img src={title?.imageUrl} alt="title-img" />
                    <section className="title-name">
                        <p id="name">{title?.title}</p>
                        <p id="author">{title?.author.authorName}</p>
                    </section>
                    <section className="buttons">
                        <button className="bookmark-btn" onClick={() => handleFollow(!isFollowed)}>
                            {isFollowed ? <FollowedIcon /> : <BookmarkIcon/>}
                            <span>{isFollowed ? "Unfollow" : "Follow"}</span>
                        </button>
                        <button className="rate-btn" onClick={() => setRateActive(prev => !prev)}>
                            <StarIcon stroke="white"/> 
                            {userScore > 0 && <div id='score'>{userScore}</div>}
                            {rateActive && 
                                <div className="rate-box">
                                    <span onClick={() => rateManga(10)}>(10) Masterpiece</span>
                                    <span onClick={() => rateManga(9)}> (9) Great</span>
                                    <span onClick={() => rateManga(8)}> (8) Very Good</span>
                                    <span onClick={() => rateManga(7)}> (7) Good</span>
                                    <span onClick={() => rateManga(6)}> (6) Find</span>
                                    <span onClick={() => rateManga(5)}> (5) Average</span>
                                    <span onClick={() => rateManga(4)}> (4) Bad</span>
                                    <span onClick={() => rateManga(3)}> (3) Very Bad</span>
                                    <span onClick={() => rateManga(2)}> (2) Horrible</span>
                                    <span onClick={() => rateManga(1)}> (1) Appaling</span>
                                    {userScore > 0 && <span onClick={removeRate}>Remove Rating</span>}
                                </div>}
                        </button>
                    </section>
                    <section className="info">
                        <TagContainer tagIds={title?.tagIds}>
                            <StatusBadge status={title?.status} showPublication={true} showBackground={false} isUppercase={true}/>
                        </TagContainer>
                    </section>
                    <section className="stats">
                        <div className="rate">
                            <StarIcon className="icon" width="16px" height="16px"/> 
                            <span>{ratingScore > 0 ? ratingScore : "Not Rated"}</span>
                        </div>
                        <div className="bookmark">
                            <BookmarkIcon className="icon" width="16px" height="16px"/>
                            <span>{follow}</span>
                        </div>
                        <div className="visibility">
                            <EyeIcon className="icon" width="16px" height="16px"/>
                            <span>N/A</span>
                        </div>
                    </section>
                    <div className="summary">{
                        title ? splitParagraph(title.summary).map((paragraph) => {
                            return <p>{paragraph}</p>
                        }) : "No summary"
                    }</div>
                </TitleInfo>
            </Container>
        )

        if (loading) 
            return (
                <Container>
                    <div className="title-banner shimmer"></div>
                    <TitleInfo isNavBarHidden={isNavBarHidden} status={title?.status} hasRated={userScore > 0}>
                        <div className="img-holder skeleton"></div>
                        <div style={{height: '227px'}}></div>
                        <section className="buttons">
                            <button className="bookmark-btn">
                                <Spinner size="1.4rem"/>
                            </button>
                            <button className="rate-btn">
                                <Spinner size="1.4rem"/>
                            </button>
                        </section>
                        <section className="info">
                            <TagContainer tagIds={title?.tagIds}>
                                <StatusBadge status={title?.status} showPublication={true} showBackground={false} isUppercase={true}/>
                            </TagContainer>
                        </section>
                        <section className="stats">
                            <div className="rate">
                                <StarIcon className="icon" width="16px" height="16px"/> 
                                <div className="skeleton" style={{width: '1rem', height: '1.25rem'}}></div>
                            </div>
                            <div className="bookmark">
                                <BookmarkIcon className="icon" width="16px" height="16px"/>
                                <div className="skeleton" style={{width: '1rem', height: '1.25rem'}}></div>
                            </div>
                            <div className="visibility">
                                <EyeIcon className="icon" width="16px" height="16px"/>
                                <span>N/A</span>
                            </div>
                        </section>
                    </TitleInfo>
                </Container>
            )

    
}