import styled from "styled-components";
interface RandomProps {
    isNavBarHidden: boolean
}

export const Container = styled.div<RandomProps>`
    position: absolute;
    width: ${props => props.isNavBarHidden ? "100%" : "calc(100% - 260px)"};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 1.7rem;
`