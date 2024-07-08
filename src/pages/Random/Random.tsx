
import { useEffect } from "react";
import { Container, Spinner } from "./Random.style";

interface RandomProps {
    isNavBarHidden: boolean
}

export default function Random({ isNavBarHidden }: RandomProps) {
    useEffect(() => {
    }, [])
    return (
        <Container isNavBarHidden={isNavBarHidden}>
            <Spinner/>
            <div>Grabbing a random title...</div>
        </Container>
    )
}