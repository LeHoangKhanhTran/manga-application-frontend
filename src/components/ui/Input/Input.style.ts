import styled from "styled-components";

export const InputField = styled.div`
    width: 100%;
    label {
        display: block;
        font-weight: 500;
        margin-block-end: 2px;
        font-size: 1rem;
    }
    
    input {
        position: relative;
        width: 100%;
        padding: 7px 7px 8px 7px;
        height: 35px;
        box-sizing: border-box;
        border: none;
        background: var(--input-background-color);
        border-radius: 4px;
        font-size: 1rem;
        color: black;
    }

    input:focus {
        outline: none;
        border: 2.5px solid var(--primary-btn-color);
        color: var(--primary-text-color);
        background-color: #56596a;
    }

    .require-sign {
        color: red;
        font-size: 1.2rem;
    }

    .warning, .warning:focus {
        border: 2.5px solid red;
    }
`