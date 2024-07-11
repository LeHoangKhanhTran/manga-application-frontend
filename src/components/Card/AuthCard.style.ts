import styled from "styled-components"

export const Card = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 504px;
    min-height: 448px;
    background-color: var(--secondary-background-color);
    border-radius: 4px;
    padding: 20px 40px 30px 40px;
    box-sizing: border-box;
    color: var(--primary-text-color);
    &::before {
        content: '';
        position: absolute;
        top: 0;
        width: 100%;
        background-color: var(--primary-btn-color);
        height: 5px;
        border-radius: 4px 4px 0 0;
    }

    h2 {
        font-weight: bolder;
        font-size: 1.5rem;
        margin: 1rem 0;
    }

    form {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        font-size: 0.9rem;
    }

    .auth-btn {
        position: relative;
        box-sizing: border-box;
        padding: 10px 20px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        font-family: 'League Spartan', sans-serif !important;
        font-size: 1rem;
        font-weight: 500;
        background: var(--primary-btn-color);
        margin-top: 15px;
    }


    .auth-btn:hover {
        background-color: #5a61e5;
    }

    .error {
        font-size: 1rem;
        color: red;
    }

    @media screen and (max-width: 680px){
        padding: 20px;
        width: 80vw;
        min-width: 330px;
    }
`