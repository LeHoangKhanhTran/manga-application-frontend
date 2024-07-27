import styled from "styled-components";

export const Container = styled.section`
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    column-gap: 5px;
    row-gap: 2px;

    .tag {
        align-self: flex-start;
        line-height: .625em;
        font-size: .65em;
        background: #2f333b;
        padding: 5px .375rem 3px .375rem;
        box-sizing: border-box;
        font-weight: 700;
        border-radius: 4px;
        text-transform: uppercase;
    }
    
    & > div {
        display: flex;
        align-items: center;
        gap: 7px;
        font-weight: 600;
        font-size: .8em;
    }

    @media screen and (max-width: 780px){
      font-size: 12px;
    }

    @media screen and (max-width: 580px){
      font-size: 10px;
    }
`