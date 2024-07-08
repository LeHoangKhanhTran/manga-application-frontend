import { useEffect, useLayoutEffect, useState } from "react";
import SlideItem from "../SlideItem/SlideItem";
import { Container } from "./Slider.style";
import axios, { Axios, AxiosResponse } from "axios";
import { Title } from "../../pages/Title/Title";

interface SliderProps {
    isNavBarHidden: boolean, 
    index: number
}

// interface Title {
//     id: string
//     title: string,
//     summary: string,
//     author: {
//         authorId: string, 
//         authorName: string
//     },
//     status: "Ongoing" | "Completed" | "Hiatus" | "Cancelled",
//     imageUrl: string,
//     tagIds: string[],
//     rating: number, 
//     createdDate: Date
// }

export default function Slider({ isNavBarHidden, index } : SliderProps) {
    const [items, setItems] = useState<Title[]>();
    useLayoutEffect(() => {
        const fetch = async() => {
            try {
                const response: AxiosResponse = await axios.get('https://localhost:7245/api/manga/list?numberOfItem=5');
                setItems(prev => response.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetch();
    }, [])
    return (
        <Container>
            {items && items.map((item) => {
                    return <SlideItem item={item as Title} isNavBarHidden={isNavBarHidden} index={index}/>
            })}
        </Container>
    )
}