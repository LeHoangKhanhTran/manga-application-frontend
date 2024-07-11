import styled from "styled-components";
import { Link } from 'react-router-dom';
interface MangaItemProps {
    status: "Ongoing" | "Completed" | "Hiatus" | "Cancelled"
}

const statusColor = {
    Ongoing: "#50fa7b", 
    Completed: "#8be9fd",
    Hiatus: "#ffb86c",
    Cancelled: "#ff5555"
} as { [key: string]: string }

export const Container = styled(Link)<MangaItemProps>`
    width: 100%;
    height: fit-content;
    background: #343746;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 5px;
    cursor: pointer;
    color: var(--primary-text-color) !important;
    overflow: hidden;
    font-size: 14px;

    .item-content {
        display: grid;
        grid-template-columns: 56px auto;
        grid-template-rows: auto auto auto;
        column-gap: .75em;
        height: 80px;
    }

    .item-content > img {
        height: inherit;
        border-radius: 4px;
        grid-row: span 3;
    }

    .item-title {
        word-break: break-all;
        max-height: 35px;
        font-size: 1.3em;
        line-height: 1.3em;
        font-weight: 800;
    }

    .flex-container {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .rate {
        color: var(--primary-btn-color);
    }

    .rate, .bookmark, .visibility {
        display: flex;
        font-size: 1.05em;
        gap: 3px;
    }

    .rate > div, .bookmark > div, .visibility > div {
        position: relative;
        bottom: 4px;
    }

    .item-status {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: .85em;
        line-height: 1.1em;
        background: #282A36;
        padding: 0 6px;
        box-sizing: border-box;
        width: fit-content;
        border-radius: 4px;
    }

    .status-light {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background:${props => statusColor[props.status.toString()]};
    }

    @media screen and (max-width: 780px){
        font-size: 13px;

        .item-title {
            line-height: 1em;
        }
        .rate, .bookmark, .visibility {
            font-size: 1.2em;
        }
        
    }

    /* @media screen and (max-width: 680px){
        width: calc(100% - 20px);
        
    } */
`