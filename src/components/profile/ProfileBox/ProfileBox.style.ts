import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    top: 58px;
    right: 25px;
    z-index: 2200;
    width: 320px;
    padding: 1.5rem;
    background: #282A36;
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 4px;

    hr {
        border-top-width: 1px;
        color: white;
        height: 0;
        width: 100%;
    }

    .shade {
        position: fixed; 
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        z-index: -1;
    }

    button {
        width: 100%;
        padding: 10px 0;
        font-size: 1rem;
        border-radius: 4px;
        border: none;
        font-weight: 700;
        cursor: pointer;     
    }

    .sign-in {
        background: var(--primary-btn-color);
    }

    .register {
        background: transparent;
    }
`

export const Profile = styled(Link)`
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    border-radius: 4px;
    padding: 8px 0;
    img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin-block-end: 10px;
    }

    span {
        font-size: 1.35rem;
        font-weight: 800;
    }
    
    div {
        padding: 1px 9px;
        border-radius: 4px;
        background: white;
        color: black;
        font-weight: 500;
        font-size: .9rem;
    }

    &:hover {
        background: #2f333b;
    }
`

export const Options = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    .option {
        color: white !important;
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        padding: 5px 15px;
        font-size: 1.1rem;
        font-weight: 500;
        cursor: pointer;
        border-radius: 4px;
    }

    .option:hover {
        background: #2f333b;
    }
`