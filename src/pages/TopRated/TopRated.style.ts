import styled from "styled-components";

interface TopRatedProps {
    isNavBarHidden: boolean
}
export const Container = styled.div<TopRatedProps>`
    position: relative;
    top: calc(56px + .5rem);
    width: 100%;
    height: fit-content;
    padding: ${props => props.isNavBarHidden ? '0 60px' : '0 20px'};
    padding-bottom: 60px;
    #top-bar {
        display: flex;
        gap: 10px;
        font-size: 1.7rem;
        align-items: center;
        font-weight: 500;
        cursor: default;
    }

    #back-arrow {
        cursor: pointer;
        border-radius: 50%;
        padding: .2rem;
    }

    #back-arrow:hover {
        background: #2f333b;
    }

    .manga-list {
        position: relative;
        top: 40px;
        display: grid;
        grid-template-columns: auto auto auto auto auto auto;
        gap: 1.2rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .list-item {
        flex: 1 1 20%;
        display: flex;
        flex-direction: column;
        justify-self: start;
        gap: 7px;
        max-width: 188px;
        width: 100%;
    }

    .img-container {
        width: fit-content;
        position: relative;
        height: 272px;
    }

    .img-container > img {
        border-radius: 4px;
        width: 100%;
        height: 100%;
    }

    .list-item > img {
        position: relative;
        border-radius: 4px;
        object-fit: cover;
        height: 272px;
    }

    .list-item > .name {
        font-size: 1.05rem;
        font-weight: 500;
    }

    .img-container:hover::before {
        content: attr(data-summary);
        position: absolute;
        background: black;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        opacity: 0.7;
        padding: .5rem .6rem;
        box-sizing: border-box;
        font-size: .97rem;
    }

    .rating-container {
        display: flex;
        align-items: center;
        gap: 5px;
        position: absolute;
        right: 5px;
        bottom: 5px;
        background: #343746;
        padding: 0 .3rem;
        border-radius: 4px;
    }

    .rating {
        padding-top: 3px;
        font-size: 1.05rem;
        color: var(--primary-text-color);
    }

    @media screen and (max-width: 1200px){
        .manga-list {
            grid-template-columns: auto auto auto auto;
        }
    }

    @media screen and (max-width: 900px){
        padding: 0 20px;
        width: 100dvw;
        margin-left: 0;
        .manga-list {
            grid-template-columns: auto auto auto;
            column-gap: .5rem;
        }
    }

    @media screen and (max-width: 580px){
        .manga-list {
            grid-template-columns: auto auto;
        }

        .list-item {
            width: 170px;
        }

    }


`