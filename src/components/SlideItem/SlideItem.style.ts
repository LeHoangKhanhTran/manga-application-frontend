import { Link } from "react-router-dom";
import styled from "styled-components";
interface ContainerProps {
    isNavBarHidden: boolean
}
export const Container = styled(Link)<ContainerProps>`
    position: relative;
    padding: ${props => props.isNavBarHidden ? "0 60px" : "0 20px"};
    flex: 1 0 auto; 
    width: 100%; 
    box-sizing: border-box;
    transform: translateX(-0%);
    color: var(--primary-text-color);
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 445px;
        background: linear-gradient(to bottom,rgb(40 42 54/.6),rgb(40 42 54));
        z-index: 10;
    }
    
    .banner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 150%;
        object-fit: cover;
        object-position: 0px 30%;
    }


    .title-section {
        position: relative;
        z-index: 100;
        top: 110px;
        height: calc(100% - (56px + 45.6px + 25px));
        display: flex;
        gap: 20px;
    }

    .cover-image {
        height: 100%;
        border-radius: 4px;
    }

    .title {
        font-weight: bold;
        font-size: 2.1rem;
        margin-block-end: 0;
        word-break: break-all;
        overflow: hidden;
    }
    
    .title-info {
        position: relative;
        z-index: 70;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .title-summary {
        margin-top: 10px;
        font-size: 1.05rem;
        max-height: 190px;
        overflow: auto;
    }

    .title-summary p {
        margin-bottom: 10px;
        font-weight: 400;
    }

    .title-tags {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }

    /* .tag {
        text-align: bottom;
        font-size: .65rem;
        line-height: .65rem;
        background: #2f333b;
        padding: 4px .375rem 2px .375rem;
        font-weight: bolder;
        border-radius: 4px;
        text-transform: uppercase;
    } */

    .author {
        position: absolute;
        bottom: 0;
        font-weight: 500;
        font-size: 1.15rem;
    }

    @media screen and (max-width: 780px){
        padding: 0 20px;
    }

    @media screen and (max-width: 580px) {
        .title-section {
            top: 100px;
            gap: 15px;
        }
        
        .title {
            word-break: keep-all;
            font-size: 1.4rem;
        }

        .author {
            font-size: .9rem;
        }
        .title-summary {
            display: none;
        }
    }
`

