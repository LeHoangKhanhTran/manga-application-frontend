import { Container } from "./StatsContainer.style";
import { ReactComponent as BookmarkIcon } from "../../assets/bookmark.svg";
import { ReactComponent as StarIcon } from "../../assets/star.svg";
import { ReactComponent as EyeIcon } from "../../assets/eye.svg";
import { ReactNode } from "react";

interface StatContainerProps {
    ratingScore: number | undefined,
    follow: number | undefined, 
    children?: ReactNode
}
export default function StatsContainer({ ratingScore, follow, children }: StatContainerProps) {
    return (
        <Container>
            <div className="rate">
                <StarIcon className="icon" width="16px" height="16px"/> 
                <span>{ratingScore && ratingScore > 0 && ratingScore}</span>
            </div>
            <div className="bookmark">
                <BookmarkIcon className='icon' width="16px" height="16px"/>
                <span>{follow != undefined && follow}</span>
            </div>
            <div className="visibility">
                <EyeIcon className='icon' width="16px" height="16px"/>
                <span>N/A</span>
            </div>
            {children}
        </Container>
    )
}