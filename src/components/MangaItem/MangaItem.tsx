import { ReactComponent as StarIcon } from "../../assets/star.svg";
import { ReactComponent as BookmarkIcon } from "../../assets/bookmark.svg";
import { ReactComponent as EyeIcon } from "../../assets/eye.svg"
import { Container } from "./MangaItem.style";
import StatusTag from "../StatusTag/StatusTag";
import { transformLongText } from "../../util";


interface MangaItemProps {
    id: string,
    url: string,
    name: string, 
    status: "Ongoing" | "Completed" | "Hiatus" | "Cancelled",
    rating: number, 
    follows: number,
    onClick: () => void
}
export default function MangaItem({id, url, name, status, rating, follows, onClick} : MangaItemProps) {
    const getBreakText = () => {
        if (window.innerWidth < 780 && window.innerWidth >= 480) {
            return 25;
        }
        else if (window.innerWidth < 380) {
            return 18;
        }
        return 40
    }
    return (
        <Container status={status} to={`/title/${id}`} onClick={onClick}>
            <div className="item-content">
                <img src={url} alt="" />
                <span className="item-title">{transformLongText(name, getBreakText())}</span>
                <div className="flex-container wrapper">
                    <div className="rate">
                        <StarIcon width="14px" height="14px"/> 
                        <div>{rating > 0 ? rating : "Not rated"}</div>
                    </div>
                    <div className="bookmark">
                        <BookmarkIcon width="14px" height="14px"/>
                        <div>{follows}</div>
                    </div>
                    <div className="visibility">
                        <EyeIcon width="14px" height="14px"/>
                        <div>N/A</div>
                    </div>
                </div>
                <StatusTag status={status}/>
            </div>
        </Container>
    )
}