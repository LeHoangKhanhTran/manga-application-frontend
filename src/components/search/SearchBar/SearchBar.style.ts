import styled from "styled-components";

interface SearchBarProps {
    isNavBarHidden: boolean, 
    isFocused: boolean
}
export const Container = styled.div<SearchBarProps>`
    display: flex;
    align-items: center;
    gap: 20px;
    z-index: 2000;
    position: fixed;
    right: 0;
    justify-content: flex-end;
    width: ${props => props.isNavBarHidden ? "calc(100dvw - 269px - (60px + 34px + 20px));" : "calc(100dvw - 269px - (20px + 34px + 20px));"};
    right: ${props => props.isNavBarHidden ? "calc(60px + 34px + 20px);" : "calc(20px + 34px + 20px);"};
    height: 56px;
    box-sizing: border-box;
   
    form {
        position: relative;
        display: flex;
        align-items: center;
    }


    input[type="search"] {
        --webkit-appearance: none;
        appearance: none;
        background: rgb(52, 55, 70, 0.75);
        width: ${props => props.isFocused ? "38dvw" : "300px"};
        outline: none;
        min-width: ${props => props.isFocused ? "360px" : "320px"};;
        border-radius: 7px;
        padding: .25rem 1rem;
        font-size: 1rem;
        color: var(--primary-text-color);
        box-sizing: border-box;
        border: ${props => props.isFocused ? "1px solid var(--primary-btn-color)" : "none"};
    }

    input[type="search"]::placeholder {
        color: var(--primary-text-color);
        font-size: large;
    }


    #search-icon {
        position: absolute;
        right: 20px;
        pointer-events: none;
    }

    .search-result {
        position: absolute;
        top: calc(100% + 5px);
        width: 100%;
        background: #282A36;
        border-radius: 4px;
        padding: 16px 15px;
        box-sizing: border-box;
        font-size: 1.1rem;
        display: flex;
        flex-direction: column;
        gap: 20px;
        overflow-y: scroll;
        max-height: calc(100dvh - 5rem);
    }

    #close-btn {
        position: fixed;
        display: none;
        right: 0;
        border-radius: 50%;
        border: none;
        background: transparent;
        cursor: pointer;
        pointer-events: none;
    }

    #close-btn::after {
        content: "\\00d7";
        font-size: 2.3rem;
        cursor: pointer;
        color: white !important;
        padding-right: 2px;
    }

    @media screen and (max-width: 780px){
        right: calc(20px + 34px + 20px);
        input[type="search"] { 
            min-width: 360px;
        }
    }

    @media screen and (max-width: 680px){
        font-size: 12px;
        width: ${props => props.isFocused ? '100dvw' : '25px'};
        right: 0;
        background: ${props => props.isFocused ? 'var(--primary-background-color)' : 'transparent'};
        
        form {
            width: 100%;
            padding: 0 10px;
        }

        input[type="search"] { 
           display: ${props => props.isFocused ? 'inline-block' : 'none'};
           left: 0;
           width: 95%;
           min-width: 295px;
        }

        .search-result {
            width: calc(95% - 20px);
            min-width: 295px;
        }

        #search-icon {
            right: ${props => props.isFocused ? '10vw' : 'calc(20px + 34px + 2vw)'};
            width: 22px;
            height: 22px;
            pointer-events: all;
        }

        #close-btn {
            display: ${props => props.isFocused ? 'flex' : 'none'};
            justify-content: center;
            align-items: center;
            pointer-events: all;
            transform: translateX(5px);
        }
 
    }
`

export const ResultSection = styled.section`
    .search-result-type {
        font-size: 1.45rem;
        font-weight: bold;
    }

    .search-result-list {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 10px;
        gap: .5rem;
    }
`

