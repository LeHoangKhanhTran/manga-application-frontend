import styled from "styled-components";
interface ContainerProps {
    isNavBarHidden: boolean,
}
export const Container = styled.div<ContainerProps>`
    width: 100%;
    height: fit-content;
    position: relative;
    padding-bottom: 40px;
    .slider-wrapper {
        position: relative;
        width: ${props => props.isNavBarHidden ? "100dvw" : "calc(100dvw - 270px)"};
        height: 440px;
    }


    h2 {
        position: relative;
        left: ${props => props.isNavBarHidden ? "60px" : "20px"};
        font-size: 1.85rem;
        font-weight: 500;
        z-index: 100;
        top: 30px;
    }

    .featured-titles {
        position: absolute;
        top: 50px;
    }


    .switch-title {
        position: absolute;
        bottom: 10px;
        right: 30px;
        font-size: 1rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 20px;
        z-index: 20;
    }

    .arrow-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: none;
        border: none;
        cursor: pointer;
        border-radius: 50%;
    }

    .arrow-btn:hover {
        background: #2f333b;
    }

    .most-popular {
        color: var(--primary-btn-color);
    }

    .recent {
        padding: 0 20px;
    }

    .recent > h2 {
        left: 0;
    }

    .list {
        margin-top: 35px;
        padding: 10px 0;
        white-space: nowrap;
        overflow-x: hidden;
        
    }
    
    .list-item {
        position: relative;
        display: inline-block;
        width: ${props => props.isNavBarHidden ? 'calc((100% - 90px) / 10)' : 'calc((100% - 80px) / 9)'};
        height: calc(192px + 5.2rem);
        font-size: 1.05rem;
        margin-right: 10px;
        transition: transform 1.8s;
        color: var(--primary-text-color);
        overflow: visible;
    }

    .list-item > img {
        display: block;
        border-radius: 4px;
        width: 100%;
        height: ${props => props.isNavBarHidden ? '210px' : '193px'};
    }

    .list-item > div {
        position: absolute;
        display: inline;
        white-space: initial;
        word-break: initial;
        top: ${props => props.isNavBarHidden ? 'calc(210px + 7px)' : 'calc(192px + 7px)'};
        text-align: center;
        font-size: .95rem;
    }

    @media screen and (min-width: 1350){
        .list-item {
            width: calc((100% - 90px) / 10);
        }
    }

    @media screen and (max-width: 1300px){
        .list-item {
            width: calc((100% - 60px) / 7);
        }
    }

    @media screen and (max-width: 980px){
        .list-item {
            width: calc((100% - 50px) / 6);
        }
    }

    @media screen and (max-width: 800px){
        width: 100dvw;

        .slider-wrapper {
            width: 100dvw;
        }

        h2 {
            left: 20px;
        }

        .list-item {
            width: calc((100% - 40px) / 5);
        }

        .list-item > img{   
            height: 207px;
        }

        .list-item > div {
            top: 220px
        }
    }

    @media screen and (max-width: 680px){
        .list-item {
            width: calc((100% - 30px) / 4);
        }
    }

    @media screen and (max-width: 580px) {
        .slider-wrapper {
            height: 43dvh;
        }

        .featured-titles {
            font-size: 1.5rem;
        }

        .switch-title {
            font-size: .9rem;
            gap: 5px;
            bottom: 0;
            right: 50%;
            transform: translate(50%, 5px);
        }

        .arrow-btn {
            width: 30px;
            height: 30px;
        }

        .list-item > img {
            height: 200px;
        }

        .list-item > div {
            top: calc(200px + 7px)
        }
    }

    @media screen and (max-width: 490px){
        .list-item {
            width: calc((100% - 20px) / 3);
        }
    }

`