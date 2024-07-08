import { ReactComponent as HomeIcon } from "../../assets/home.svg"
import { ReactComponent as FollowIcon } from "../../assets/follow.svg"
import { ReactComponent as TitleIcon } from "../../assets/titles.svg"
import { ReactComponent as LogoIcon } from "../../assets/mangadex-logo.svg"
import { ReactComponent as WordMark } from "../../assets/mangadex-wordmark.svg"
import { ReactComponent as AboutIcon } from "../../assets/about.svg"
import { ReactComponent as DiscordIcon } from "../../assets/discord.svg"
import { ReactComponent as TwitterIcon } from "../../assets/twitter.svg"
import { ReactComponent as RedditIcon } from "../../assets/reddit.svg"
import { ReactComponent as StatusIcon } from "../../assets/status.svg"
import dexChan from "../../assets/support-dex-chan-1.png"
import { Container } from "./NavBar.style"
import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios, { AxiosResponse } from "axios";
interface NavBarProps {
    onClose: () => void,
}

const routeMap = new Map([
    ['/', 'home'],
    ['/user/follows', 'follows'],
    ['/random', 'random'],
    ['/top-rated', 'top-rated']
])

export default function NavBar({ onClose }: NavBarProps) {
    const location = useLocation();
    useEffect(() => {
        let listItems = document.getElementsByClassName("menu-option") as HTMLCollectionOf<HTMLElement>;
        let home = document.getElementById("home")!;
        home.style.background = "var(--primary-btn-color)"
        let elements = Array.from(listItems);
        elements.push(home)
        function changeStyle (x: HTMLElement, _ev: MouseEvent) {
            Array.from(elements).forEach(item => {
                item.style.background = "";
            })
            x.style.background = "var(--primary-btn-color)";
        }
        const handleClick: (this: HTMLElement, _ev: MouseEvent) => any = function (this: HTMLElement, ev: MouseEvent) {
            changeStyle(this, ev); 
        };
        Array.from(elements).forEach(element => {
            element.addEventListener('click', handleClick)
        });
       return (() => {
        Array.from(elements).forEach(element => {
            element.removeEventListener("click", handleClick);
        });
       })
    }, []) 
    
    useEffect(() => {
        let listItems = document.getElementsByClassName("menu-option") as HTMLCollectionOf<HTMLElement>;
        let id: string = routeMap?.get(location.pathname) as string
        let target = document.getElementById(id)!; 
        Array.from(listItems).forEach((item) => {
            item.style.background = "";
        });
        if (target) {
            target.style.background = 'var(--primary-btn-color)'
        }
        
        
    }, [location.pathname])
    
    const navigate = useNavigate();
    const navigateToTitle = async() => {
        try {
            const response: AxiosResponse = await axios.get('https://localhost:7245/api/manga/random');
            setTimeout(() => {
                navigate(`../title/${response.data}`)
            }, 1500)
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
            <Container>
            <header>
                <a className="icon" href="/">
                    <LogoIcon/>
                    <WordMark/>
                </a>
            </header>
            <button className="close-btn" onClick={onClose}></button>
            <section className="menu-section">
                <Link className="menu-category menu-option" id="home" to="/">
                    <HomeIcon/>
                    <span>Home</span>
                </Link>
                <section>
                    <div className="menu-category">
                        <FollowIcon/>
                        <span>Follows</span>
                    </div>
                    <div className="menu-list">
                    <Link to='../user/follows' id="follows" className="menu-option">
                            <span>Follows</span>
                        </Link> 
                    </div>
                </section>
                <section>
                    <div className="menu-category">
                        <TitleIcon/>
                        <span>Titles</span>
                    </div>
                    <div className="menu-list">
                        <div className="menu-option">Advanced Search</div>
                        <Link to='../top-rated' className="menu-option" id="top-rated">Top Rated</Link>
                        <Link className="menu-option" to='/random' onClick={navigateToTitle} id="random">
                            <span>Random</span>
                        </Link>
                    </div>
                </section>
                <section>
                    <div className="menu-category">
                        <AboutIcon/>
                        <span>MangaDex</span>
                    </div>
                    <div className="menu-list">
                        <div className="menu-option">Support Us</div>
                        <div className="menu-option">Site Rules</div>
                        <div className="menu-option">About Us</div>
                    </div>
                </section>
            </section>
            <a href="https://namicomi.com/en/org/3Hb7HnWG/mangadex/subscriptions?utm_source=md&utm_campaign=sidebar_affiliate" target="_blank">
                <img src={dexChan} width="100%" alt="support-dex-chan" />
            </a>
            <hr />
            <footer>
                <div className="media">
                    <DiscordIcon className="media-item"/>
                    <TwitterIcon className="media-item"/>
                    <RedditIcon className="media-item"/>
                    <StatusIcon className="media-item"/>
                </div>
                <div className="copyright">
                    <span>v2024.5.24</span>
                    <span>© MangaDex 2024</span>
                </div>
            </footer>
        </Container>
        )
}