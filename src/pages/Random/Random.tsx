import { Container } from "./Random.style";
import Spinner from "../../components/Spinner/Spinner";
interface RandomProps {
    isNavBarHidden: boolean
}

export default function Random({ isNavBarHidden }: RandomProps) {
    return (
        <Container isNavBarHidden={isNavBarHidden}>
            <Spinner size="1.35rem"/>
            <div>Grabbing a random title...</div>
        </Container>
    )
}