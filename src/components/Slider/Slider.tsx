import SlideItem from "../SlideItem/SlideItem";
import { Container, LoadingItem } from "./Slider.style";
import { Title } from "../../types";
import useFetch from "../../hooks/useFetch";
interface SliderProps {
    isNavBarHidden: boolean, 
    index: number
}

const numberOfItem = 5;
export default function Slider({ isNavBarHidden, index } : SliderProps) {
    const { data: items, loading } = useFetch<Title[]>(`/api/manga/list?numberOfItem=${numberOfItem}`);
    return (
        <Container>
            {loading && <LoadingItem className="skeleton"/>}
            {!loading && items?.map((item) => {
                    return <SlideItem item={item as Title} isNavBarHidden={isNavBarHidden} index={index}/>
            })}
        </Container>
    )
}