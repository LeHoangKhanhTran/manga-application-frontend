import { Container } from "./AuthorItem.style";

interface AuthorItemProps {
    id: string,
    name: string,
    titleQuantity: number
    onClick: () => void
}
export default function AuthorItem({ id, name, onClick, titleQuantity } : AuthorItemProps) {
    return (
        <Container to={`/author/${id}`} onClick={onClick}>
            <div className="info">
                <img className="author-img" src="https://mangadex.org/img/avatar.png" alt="author-img" />
                <div className="author-name">{name}</div>
            </div>
            <span>{titleQuantity ? titleQuantity : 0} title</span>
        </Container>
    )
}