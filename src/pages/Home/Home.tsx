import { Container, LoadingItem } from "./Home.style";
import { ReactComponent as LeftArrow } from "../../assets/left-arrow.svg"
import { ReactComponent as RightArrow } from "../../assets/right-arrow.svg"
import Slider from "../../components/Slider/Slider";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { transformLongText } from "../../util";
import useFetch from "../../hooks/useFetch";
interface HomeProps {
    isNavBarHidden: boolean
}

interface RecentItem {
    id: string,
    title: string,
    imageUrl: string
}

const numberOfItem = 10;
export default function Home({ isNavBarHidden }: HomeProps) {
    const [index, setIndex] = useState<number>(0);
    const { data: recentManga, loading } = useFetch<RecentItem[]>(`/api/manga/recently-added?numberOfItem=${numberOfItem}`);
    const nextIndex = () => setIndex(prev => (5 + prev + 1) % 5);
    const prevIndex = () => setIndex(prevIndex => (5 + prevIndex - 1) % 5)
    const list= useRef<HTMLDivElement | null>(null);
    const [wheelAmount, setWheelAmount] = useState<number>(0);
    const wheelTimeout = useRef(-1);
    const itemRef = useRef<HTMLAnchorElement | null>(null);
    const hasReachedEnd = (): boolean => {
        return (itemRef?.current as HTMLAnchorElement).getBoundingClientRect().left <= window.outerWidth - (itemRef?.current as HTMLAnchorElement).offsetWidth;
    }
    

    useEffect(() => {
        const wheelEvent = (e: WheelEvent) => {
            e.preventDefault()        
            clearTimeout(wheelTimeout.current);
            const timeOut = setTimeout(() => {
                if (e.deltaY < 0) {
                    setWheelAmount(prev => (prev - 1) < 0 ? 0 : prev - 1)
                }
                else {
                    setWheelAmount(prev => hasReachedEnd() ? prev : prev + 1)
                }
            }, 300)
            wheelTimeout.current = timeOut;
        }
            list.current?.addEventListener('wheel', wheelEvent)
            return (
                () => {
                    list.current?.removeEventListener('wheel',wheelEvent)
                    if (wheelTimeout) {
                        clearTimeout(wheelTimeout.current);
                      }
                }
            )
            
    }, [])

    return (
        <Container isNavBarHidden={isNavBarHidden}>
            <h2 className="featured-titles">Featured Titles</h2>
            <div className="slider-wrapper">
                <Slider isNavBarHidden={isNavBarHidden} index={index}/>
                <div className="switch-title">
                    <span className={index === 0 ? "most-popular" : ""}>NO.{index + 1}</span>
                    <button className="arrow-btn left-arrow" onClick={prevIndex}>
                        <LeftArrow/>
                    </button>
                    <button className="arrow-btn right-arrow" onClick={nextIndex}>
                        <RightArrow/>
                    </button>
                </div>
            </div>
            <section className="recent">
                <h2>Recently Added</h2>
                <div className="list" ref={list}>
                    {!loading && recentManga?.map((manga, i) => {
                        if (i < recentManga.length - 1) {
                            return (
                                <Link to={`../title/${manga.id}`} className="list-item" style={{transform: `translateX(calc(${-100 * wheelAmount }% - ${wheelAmount* 10}px)`}}>
                                    <img src={manga.imageUrl} alt="recent-manga-img" />
                                    <div>{transformLongText(manga.title, 26)}</div>
                                </Link>
                            )
                        }
                        return (
                            <Link ref={itemRef} to={`../title/${manga.id}`} className="list-item" style={{transform: `translateX(calc(${-100 * wheelAmount }% - ${wheelAmount* 10}px)`}}>
                                <img src={manga.imageUrl} alt="recent-manga-img" />
                                <div>{transformLongText(manga.title, 26)}</div>
                            </Link>
                        )
                    })}
                    {loading && Array.apply(null, Array(10)).map(() => {
                        return (
                            <LoadingItem isNavBarHidden={isNavBarHidden}>
                                <div className="img-holder skeleton"></div>
                            </LoadingItem>
                        )
                    })}
                    
                </div>  
            </section>
        </Container>
    )
}