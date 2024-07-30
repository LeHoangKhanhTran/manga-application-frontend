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
        background: var(--hover-background-color);
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

    .list-container {
        position: relative;
        min-width: 100%;
        overflow: hidden;
    }

    .list {
        margin-top: 35px;
        padding: 10px 0;
        display: flex;
        flex-wrap: nowrap;
        gap: .6rem;
        min-height: 280px;
        transition: transform 1.5s;
    }
    
    .list-item {
        position: relative;
        flex: 1 0 auto;
        width: ${props => props.isNavBarHidden ? 'calc((100% - 90px) / 10)' : 'calc((100% - 80px) / 9)'};
        height: calc(192px + 5.2rem);
        font-size: 1.05rem;
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

    .dot-container {
        position: absolute;
        bottom: .5rem;
        width: 100%;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
    }

    .dot {
        border-radius: 50%;
    }

    .active {
        width: .5rem;
        height: .5rem;
        background: var(--primary-btn-color);
    }

    .inactive {
        width: .35rem;
        height: .35rem;
        background: var(--item-background-color);
    }

    .rear {
        width: .24rem;
        height: .24rem;
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
        .recent {
            padding: 0 1rem;
        }

        .recent > h2 {
            font-size: 1.5rem;
        }
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
            height: 190px;
        }

        .list-item > img{   
            height: inherit;
        }

        .list-item > div {
            top: 200px
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
            transform: translate(50%, 2px);
        }

        .arrow-btn {
            width: 25px;
            height: 25px;
        }

        .list-item > img {
            height: 200px;
        }

        .list-item > div {
            top: calc(200px + 7px)
        }

        .switch-title {
            width: 100%;
            justify-content: space-around;
        }

        .switch-title > span {
            order: 2;
        }

        .left-arrow {
            order: 1;
        }

        .right-arrow {
            order: 3;
        }
    }

    @media screen and (max-width: 490px){
        .list-item {
            width: calc((100% - 20px) / 3);
        }

        .list-item > img {
            height: 160px;
        }

        .list-item > div {
            top: calc(160px + 7px)
        }

    }
`

export const LoadingItem = styled.div<ContainerProps>`
    position: relative;
    display: inline-block;
    flex: 1 0 auto;
    width: ${props => props.isNavBarHidden ? 'calc((100% - 90px) / 10)' : 'calc((100% - 80px) / 9)'};
    height: calc(192px + 5.2rem);
    border-radius: 4px;

    .img-holder {
        width: 100%;
        height: ${props => props.isNavBarHidden ? '210px' : '193px'};
    }

    @media screen and (min-width: 1350){
        width: calc((100% - 90px) / 10);
    }

    @media screen and (max-width: 1300px){
        width: calc((100% - 60px) / 7);
    }

    @media screen and (max-width: 980px){
        width: calc((100% - 50px) / 6);
    }

    @media screen and (max-width: 800px){
        width: calc((100% - 40px) / 5);
        height: 170px;

        .list-item > div {
            top: 220px
        }
    }

    @media screen and (max-width: 680px){
        width: calc((100% - 30px) / 4);
    }

    @media screen and (max-width: 580px) {
        .list-item > img {
            height: 200px;
        }

        .list-item > div {
            top: calc(200px + 7px)
        }

    }

    @media screen and (max-width: 490px){
        width: calc((100% - 20px) / 3);
        height: 160px;
    }
`

