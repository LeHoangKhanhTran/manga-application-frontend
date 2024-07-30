import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled(Link)`
    width: 100%;
    height: fit-content;
    background: #343746;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .author-name {
        font-size: 1.1rem;
        color: var(--primary-text-color);
    }

    .author-img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: .5px solid white;
    }

    span {
        font-size: .9rem;
        color: var(--primary-text-color);
    }
`