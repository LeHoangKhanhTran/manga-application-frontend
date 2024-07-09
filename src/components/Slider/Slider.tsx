import { useLayoutEffect, useState } from "react";
import SlideItem from "../SlideItem/SlideItem";
import { Container } from "./Slider.style";
import axios, { AxiosResponse } from "axios";
import { Title } from "../../pages/Title/Title";
import config from "../../config";
interface SliderProps {
    isNavBarHidden: boolean, 
    index: number
}


export default function Slider({ isNavBarHidden, index } : SliderProps) {
    const [items, setItems] = useState<Title[]>();
    useLayoutEffect(() => {
        const fetch = async() => {
            try {
                const response: AxiosResponse = await axios.get(`${config.apiUrl}/api/manga/list?numberOfItem=5`);
                setItems(_prev => response.data)
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