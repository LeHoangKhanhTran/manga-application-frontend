import styled from "styled-components";

interface FollowsProps {
    isNavBarHidden: boolean
}

export const Container = styled.div<FollowsProps>`
    position: relative;
    top: calc(56px + .5rem);
    width: 100%;
    height: fit-content;
    padding: ${props => props.isNavBarHidden ? '0 60px' : '0 20px'};

    #top-bar {
        display: flex;
        gap: 10px;
        font-size: 1.7rem;
        align-items: center;
        font-weight: 500;
        cursor: default;
    }

    #back-arrow {
        cursor: pointer;
        border-radius: 50%;
        padding: .2rem;
    }

    #back-arrow:hover {
        background: #2f333b;
    }

    @media screen and (max-width: 780px){
        padding: 0 20px;
    }

    @media screen and (max-width: 580px){
        padding: 0 10px;
    }
`

export const FollowItems = styled.div`
    position: relative;
    top: 40px;
    display: grid;
    grid-template-columns: auto auto;
    width: 100%;
    height: fit-content;
    gap: .7rem;
    
    @media screen and (max-width: 580px){
        grid-template-columns: auto;
    }
`