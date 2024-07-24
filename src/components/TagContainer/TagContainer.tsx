import { ReactNode, useEffect, useState } from "react";
import { Container } from "./TagContainer.style";
import axios from "axios";
import config from "../../config";
import { Tag } from "../../types";
interface TagContainerProps {
    tagIds: string[] | undefined,
    children?: ReactNode
}

export default function TagContainer({ tagIds, children }: TagContainerProps) {

    const [tags, setTags] = useState<Tag[] | null>(null);
    useEffect(() => {
        const fetchTags  = async () => {
            try {
                const requests = tagIds?.map((id) => axios.get<Tag>(`${config.apiUrl}/api/tag/${id}`));
                if (requests) {
                    const tagsResponse = await axios.all(requests)
                    setTags(_prev => tagsResponse.map(response => response.data));
                }
            }
            catch(error)
            {
                console.log(error)
            }
        }
        fetchTags();
    }, [tagIds])
    return (
        <Container>
            {tags ? tags?.map((tag) => {
                return (
                    <div className="tag">{tag.name}</div>
                )
            }) : <div>No Tags</div>}
            {children}
        </Container>
    )
}