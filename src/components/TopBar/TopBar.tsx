import { Container } from "./TopBar.style";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as PersonIcon } from "../../assets/person.svg";
import { ReactComponent as LogoIcon } from "../../assets/mangadex-logo.svg";
import { ReactComponent as WordMark } from "../../assets/mangadex-wordmark.svg";
import { ReactComponent as Hamburger } from "../../assets/hamburger.svg";
import { useEffect, useState } from "react";
import { useUserContext } from "../../App";
import catImg from "../../assets/dex-cat.png";

interface TopBarProps {
    isNavBarHidden: boolean,
    showNavBar: () => void,
    setProfile: () => void
}
export default function TopBar({ isNavBarHidden, showNavBar, setProfile } : TopBarProps) {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const { user } = useUserContext();
    useEffect(() => {
        const handleScroll: (this: Document, ev: Event) => any = function (this: Document, ev: Event) {
            if (window.scrollY > 0) {
                setIsScrolled(prev => true)
            }
            else {
                setIsScrolled(prev => false)
            }
        };
        document.addEventListener("scroll", handleScroll)
        // return (
        //     document.removeEventListener("scroll", handleScroll)
        // )
    }, [])
    return (
        <Container changeStyle={isScrolled} isNavBarHidden={isNavBarHidden}>
            { isNavBarHidden && 
            <div style={{display: "flex", gap: "10px"}}> 
                <button id="hamburger" onClick={showNavBar}>
                    <Hamburger/>
                </button>
                <a className="icon" href="/" >
                    <LogoIcon/>
                    <WordMark/>
                </a>
            </div> }
                {user ? <img id="cat-img" src={catImg} alt="dex-cat" onClick={setProfile}/>: <PersonIcon cursor="pointer" width="34" height="34" onClick={setProfile}/> }
        </Container>
    )
}