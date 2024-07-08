import { ReactNode, useEffect, useState } from "react";
import { Container } from "./TagContainer.style";
import axios, { Axios, AxiosResponse } from "axios";

interface Tag {
    id: string,
    type: string,
    name: string
}

interface TagContainerProps {
    tagIds: string[] | undefined,
    children?: ReactNode
}

export default function TagContainer({ tagIds, children }: TagContainerProps) {

    const [tags, setTags] = useState<Tag[] | null>(null);
    useEffect(() => {
        const fetchTags  = async () => {
            try {
                const requests = tagIds?.map((id) => axios.get<Tag>(`https://localhost:7245/api/tag/${id}`));
                if (requests) {
                    const tagsResponse = await axios.all(requests)
                    setTags(prev => tagsResponse.map(response => response.data));
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