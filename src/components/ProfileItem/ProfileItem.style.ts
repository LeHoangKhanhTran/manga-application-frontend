import { Link } from "react-router-dom";
import styled from "styled-components";

interface ProfileItemProps {
    isOverflow: boolean
}
export const Container = styled(Link)<ProfileItemProps>`
    display: grid;
    grid-template-areas: 
        "img name    stats"
        "img tags    tags"
        "img summary summary"
    ;
    grid-template-columns: 90px 1fr auto;
    grid-template-rows: 25px auto 1fr;
    grid-column-gap: .7rem;
    grid-row-gap: 5px;
    position: relative;
    padding: .5rem;
    border-radius: 4px;
    width: 100%;
    background: #343746;
    max-height: 151px;
    overflow: hidden;
    color: var(--primary-text-color);
    .title-img {
        grid-area: img;
        width: 90px;
        min-height: 135px;
        border-radius: 4px;
    }

    .name {
        font-size: 1.3em;
        font-weight: 700;
        grid-area: name;
        min-width: 170px;
    }

    .tags {
        grid-area: tags;
        font-size: 15px;
        margin-top: 5px;
    }

    .stats {
        grid-area: stats;
        font-size: .8em;
    }

    .summary {
        position: relative;
        grid-area: summary;
        font-size: .85em;
    }

    &::after {
        display: ${props => props.isOverflow ? "inline-block" : "none"};
        content: "";
        width: calc(100% - 90px - 1rem - .7rem);
        position: absolute;
        bottom: 0px;
        right: .5rem;
        height: 43px;
        background-image: linear-gradient(rgb(40 42 54/0),rgb(52 55 70));
    }

    @media screen and (max-width: 980px){
        grid-template-areas: 
        "img name    name"
        "img stats    stats"
        "img tags tags"
        "img summary summary"
        ;
        grid-template-rows: 18px 20px auto auto;
        font-size: 13px;
        .tags {
            margin-top: 0;
        }
    }

    @media screen and (max-width: 580px){
        grid-template-columns: 67px 60px auto;
        grid-template-rows: 18px 18px auto auto;
        grid-row-gap: 3px;

       .title-img {
            width: auto;
            min-height: 100px;
            height: 100px;
       }

        .summary {
            font-size: .7em;
            max-height: 42px;
            overflow: hidden;
        }

        &::after {
        display: ${props => props.isOverflow ? "inline-block" : "none"};
        content: "";
        width: calc(100% - (66px + .7rem));
        position: absolute;
        bottom: 0px;
        left: calc(66px + .7rem);
        right: auto;
        height: 43px;
        background-image: linear-gradient(rgb(40 42 54/0),rgb(52 55 70));
    }
       
    }
`