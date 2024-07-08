
import { useEffect, useRef, useState } from "react";
import { Container, Spinner } from "./Random.style";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useStyleSheetContext } from "styled-components/dist/models/StyleSheetManager";
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