import { ReactNode } from "react";
import { Container } from "./TagContainer.style";
import { Tag } from "../../types";
import { useMultipleFetch } from "../../hooks/useFetch";
interface TagContainerProps {
    tagIds: string[] | undefined,
    children?: ReactNode
}

export default function TagContainer({ tagIds, children }: TagContainerProps) {
    const { data: tags, loading } = useMultipleFetch<Tag, string>(tagIds as string[], '/api/tag');
    return (
        <Container>
            {!loading && tags?.map((tag) => {
                return (
                    <div className="tag">{tag.name}</div>
                )
            })}
            {!loading && (!tags || tags.length === 0) && <div>No Tags</div>}
            {loading && 
                <>
                    <div className="tag skeleton" style={{width: '4em', height: '1.5em'}}></div>
                    <div className="tag skeleton" style={{width: '4em', height: '1.5em'}}></div>
                    <div className="tag skeleton" style={{width: '4em', height: '1.5em'}}></div>
                </>
            }
            {children}
        </Container>
    )
}