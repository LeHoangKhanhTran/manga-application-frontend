import TagContainer from "../TagContainer/TagContainer"
import { Container } from "./SlideItem.style"
import { Title } from "../../pages/Title/Title"
import { splitParagraph, transformLongText } from "../../util";
interface SlideItemProps {
    isNavBarHidden: boolean,
    index: number,
    item: Title
}

export default function SlideItem({item, isNavBarHidden, index}: SlideItemProps) {
    return (
        <Container to={`/title/${item.id}`} isNavBarHidden={isNavBarHidden} style={{transform: `translateX(-${index * 100}%)`, transition: "transform 0.5s"}}>
            <img className="banner" src={item.imageUrl} alt="" />
            <section className="title-section">
                <img className="cover-image" src={item.imageUrl} alt="" />
                <div className="title-info">
                    <h1 className="title">{transformLongText(item.title, 62)}</h1>
                    <TagContainer tagIds={item.tagIds}/>
                    <div className="title-summary">
                    {splitParagraph(item.summary).map((paragraph) => {
                        return (
                            <p>{paragraph}</p>
                        )
                    })}
                    </div>
                    <span className="author">{item.author.authorName}</span>
                </div>
            </section>
    </Container>
    )
}