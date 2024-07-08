import styled from "styled-components";

interface TopBarProps {
    changeStyle?: boolean,
    isNavBarHidden?: boolean
}
export const Container = styled.div<TopBarProps>`
    position: fixed;
    top: 0;
    right: 0;
    width: ${props => props.isNavBarHidden ? "100%" : "calc(100dvw - 269px)"};
    height: 56px;
    background: ${props => props.changeStyle ? "var(--primary-background-color)" : "transparent"};
    border-bottom: ${props => props.changeStyle ? "1px solid var(--primary-btn-color)" : "none"};
    box-sizing: border-box;
    padding: ${props => props.isNavBarHidden ? "0 60px" : "0 25px"};
    display: flex;
    align-items: center;
    justify-content: ${props => props.isNavBarHidden ? "space-between" : "flex-end"};
    z-index: 1000;

    .icon {
        display: flex;
        gap: 5px; 
        align-items: center;
        color: inherit;
        cursor: pointer;
    }

    #hamburger {
        border-radius: 50%;
        background: transparent;
        border: none;
        cursor: pointer;
    }

    #hamburger:hover {
        background: rgba(0, 0, 0, 0.05);
    }

    #cat-img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        cursor: pointer;
    }

    @media screen and (max-width: 780px){
      width: 100dvw;
      padding: 0 20px;
    }

    @media screen and (max-width: 580px){
      padding: 0 10px;
    }
`
