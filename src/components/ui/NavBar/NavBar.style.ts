import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    top: 0;
    width: 260px;
    flex-shrink: 0;
    height: 100dvh;
    background-color: var(--item-background-color);
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: scroll;
    overflow-x: hidden;
    overscroll-behavior: contain;
    padding: 10px 20px;
    box-sizing: border-box;
    font-size: 1.1rem;
    color: var(--primary-text-color);
    z-index: 1200;
    .icon {
        display: flex;
        gap: 5px; 
        align-items: center;
        color: inherit;
    }

    #home {
        width: 100%;
        border-radius: 4px;
        padding: 2px 7px;
        cursor: pointer;
    }

    .menu-section{
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .menu-category {
        display: flex;
        gap: 10px;
        border-radius: 4px;
        padding: 2px 7px;
    }

    .menu-category > span {
        font-weight: 500;
        color: var(--primary-text-color);
    }


    .menu-option {
        width: 100%;
        border-radius: 4px;
        padding: 2px 15px;
        cursor: pointer;
        font-size: 1rem;
        
    }

    a {
        display: block;
    }


    .menu-option:hover, #home:hover {
        background: var(--hover-background-color);
    }

    .close-btn {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 10px;
        right: 10px;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: none;
        background: transparent;
        cursor: pointer;
    }

    .close-btn::after {
        content: "\\00d7";
        font-size: 2.3rem;
        cursor: pointer;
    }

    .close-btn:hover {
        background: rgba(0, 0, 0, 0.05);
    }
    //Notice
    hr {
        width: 100%;
        height: 0;
        border: 1px solid var(--light-gray);
    }

    .media {
        display: flex;
        justify-content: space-around;
    }

    .media-item {
        cursor: pointer;
    }

    footer {
        display: flex;
        flex-direction: column;
        font-size: 0.9rem;
    }

    .copyright {
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media screen and (max-width: 780px){
        padding: 10px;
        width: 220px;

        .close-btn {
            right: 0;
        }
    }
    @media screen and (max-width: 480px){
        padding: 10px 5px;
        width: 210px;
    }
`