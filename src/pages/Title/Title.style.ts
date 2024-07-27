import styled from "styled-components";

interface TitleProps {
    isNavBarHidden: boolean,
    status: "Ongoing" | "Completed" | "Hiatus" | "Cancelled" | undefined,
    hasRated: boolean
}

const statusColor = {
    Ongoing: "#50fa7b", 
    Completed: "#8be9fd",
    Hiatus: "#ffb86c",
    Cancelled: "#ff5555"
} as { [key: string]: string }

export const Container = styled.div`
    position: relative;
    width: 100%;
    .title-banner {
        position: absolute;
        width: 100%;
        height: 17.5rem;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 0px 25%;
    }

    .title-banner::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: inherit;
        backdrop-filter: blur(4px);
        background: linear-gradient(67.81deg,rgba(0,0,0,.64) 35.51%,transparent);
    }
`
export const TitleInfo = styled.div<TitleProps>`
    position: relative;
    width: 100%;
    padding: ${props => props.isNavBarHidden ? "0 60px" : "0 30px"};
    top: calc(56px + .5rem);
    display: grid;
    grid-template-areas: 
        "img  name"
        "img  buttons"
        "img  info"
        "left stats"
        "left right"
        "summary summary";
    grid-template-columns: 200px 1fr;
    grid-row-gap: 12px;
    grid-column-gap: 25px;

    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        filter: blur(24px);
        z-index: -1;
    }

    img, .img-holder {
        grid-area: img;
        height: 300px;
        border-radius: 4px;
    }

    .title-name {
        grid-area: name;
        overflow-wrap: break-word;
        margin-bottom: 20px;
    }

    .buttons {
        display: flex;
        gap: 10px;
        grid-area: buttons;
        position: relative;
        top: -5px;
    }

    .info {
        grid-area: info;
    }

    .info > div {
        display: flex;
        align-items: center;
        gap: 7px;
        font-weight: 600;
        text-transform: uppercase;
        font-size: .8rem;
        margin-top: 5px;
    }

    .title-tags {
        position: relative;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
    }

    .stats {
        grid-area: stats;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    #name {
        overflow: hidden;
        font-size: 4.5em;
        font-weight: 700;
        line-height: 1.1em;
        display: flex;
        flex-direction: column;
        height: 180px;
    }

    #author {
        font-size: 1.1rem;
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: none;
        border-radius: 4px;
    }

    .bookmark-btn {
        position: relative;
        padding: 0 60px;
        height: 45px;
        gap: 10px;
        background: var(--primary-btn-color);
        font-size: 1.1rem;
        font-weight: 600;
    }

    .bookmark-btn:hover::before{
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        background: black;
        opacity: 0.1;
    }

    .rate-btn {
        position: relative;
        display: flex;
        gap: 10px;
        align-items: center;
        font-size: 1.2rem;
        font-weight: 600;
        width: ${props => props.hasRated ? "" : "45px"};
        height: ${props => props.hasRated ? "" : "45px"};
        padding: ${props => props.hasRated ? "0 12px" : ""};
        background: ${props => props.hasRated ? "var(--primary-btn-color)" : "var(--hover-background-color)"};
        color: var(--primary-text-color);
        max-height: 45px;
    }

    .rate-btn:hover::after {
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: black;
        opacity: 0.15;
    }

    .status-light {
        position: relative;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${props => props.status !== undefined ? statusColor[props.status] : ""};
    }

    .rate, .bookmark, .visibility {
        display: flex;
        align-items: center;
        height: 24px;
        line-height: 24px;
        text-align: center;
        gap: 4px;
        font-size: 1.25rem;
        cursor: pointer;
    }

    .rate {
        position: relative;
        color: var(--primary-btn-color);
    }

    .rate-box {
        position: absolute;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: start;
        top: calc(100% + 5px);
        width: fit-content;
        background: var(--hover-background-color);
        z-index: 100;
        color: var(--primary-text-color);
        font-size: 1rem;
        font-weight: 500;
    }

    .rate-box span {
        padding: 7px .75rem 7px .75rem;
        box-sizing: border-box;
        width: 100%;
        text-align: left;
        white-space: nowrap;
        border-radius: 4px;
    }


    .rate-box span:hover {
        background: #2a2d35;
    }

    .stats span {
        transform: translateY(1.9px);
    }

    .summary {
        grid-area: summary;
    }

    .summary p {
        font-size: 1.05rem;
        margin-bottom: 20px;
    }

    @media screen and (max-width: 900px) {
        font-size: 13px;
    }
    
    @media screen and (max-width: 780px){
        width: 100dvw;
        font-size: 12px;
        padding: 0 20px;
        grid-template-areas: 
        "img  name"
        "img  stats"
        "img  info"
        "buttons buttons"
        "summary summary";
        grid-template-columns: 134px 1fr;
        grid-template-rows: 120px 20px 60px 60px 1fr;
        grid-row-gap: 10px;
        grid-column-gap: 15px;

        img, .img-holder {
            max-width: 135px;
            height: 200px;
        }

        .title-name {
            margin-bottom: 0;
        }

        .buttons {
            gap: .5rem;
            top: 0px;
        }

        #name {
            font-size: 2.5em;
            line-height: 1.1em;
            height: 100px;
        }

        #author {
            font-size: 1rem;
        }

        .rate, .bookmark, .visibility { 
            font-size: 1.1rem;
        }

        .status-light {
            width: 5px;
            height: 5px;
            top: 0;
        }

    }

    @media screen and (max-width: 480px){
        .stats span{
            font-size: 12px;
        }
        .icon {
            width: 10px;
            height: 10px;
        }
        grid-template-columns: 130px 1fr;
        padding: 0 10px;
    }

`