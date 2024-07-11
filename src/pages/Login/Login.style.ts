import styled from "styled-components";

export const Container = styled.main`
    display:  flex;
    justify-content: center;
    align-items: center;
    width: 100dvw;
    height: 100dvh;

    #key-img {
        position: absolute;
        z-index: -1;
        left: 0;
        bottom: 0;
    }

    .logo {
        position: fixed;
        top: 30px;
    }

    .settings {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        font-size: 1rem;
    }

    input[type="checkbox"] {
        display: none;
    }

    .settings > label > span::before {
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 5px;
        background-color: white;
        vertical-align: start;
        cursor: pointer;
    }

    .settings input[type='checkbox']:checked + span::before {
        background-color: var(--primary-btn-color);
    }

    .settings input[type='checkbox'] + span::after {
        content: '';
        display: block;
        visibility: hidden;
        width: 4px;
        height: 7px;
        border: solid #000;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        position: relative;
        top: -20px;
        left: 3.5px;
    }

    .settings input[type='checkbox']:checked + span::after {
        visibility: visible;
        
    }

    .settings > label > span::after:checked {
        display: block;
    }

    .forgot-password {
        color: var(--primary-btn-color);
        cursor: pointer;
    }

    footer {
        position: absolute;
        bottom: 0;
        background-color: #56596a;
        width: 100%;
        box-sizing: border-box;
        padding: 15px 30px;
        display: flex;
        justify-content: center;
        gap: 15px;
    }
    
    footer  #register {
        color: var(--primary-btn-color);
        cursor: pointer;
        font-weight: 600;
    }   

    .note {
        position: absolute;
        top: 15px;
        right: 40px;
        display: flex;
        justify-content: end;
        width: 100%;
    }

    .note > span:nth-child(1) {
        color: red; 
        font-size: 1.2 rem;
    }

    .note > span:nth-child(2) {
        color: gray;
    }

    .navigate {
        font-size: 1rem;
        color: var(--primary-btn-color)
    }

    .arrow {
        font-size: 0.7rem;
    }
    
    @media screen and (max-width: 780px){
        #key-img {
            width: 100%;
        }
    }

    @media screen and (max-width: 580px){
        #key-img {
            transform: translateY(-25%);
        }
    }
`
