import styled from "styled-components";
import profileBanner from "../../assets/profile-banner.png"
export const Container = styled.div`
    position: relative;
    top: 56px;
    width: 100%;
    padding-bottom: 2rem;
    .banner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 210px;
        background: url(${profileBanner});
        background-size: cover;
        background-position: center 25%;
        background-repeat: no-repeat;
        
    }
`

export const ProfileInfo = styled.div`
    position: relative;
    top: 0;
    width: 100%;
    padding: 0px 60px;
    margin-top: 5px;
    display: grid;
    font-size: 1.05rem;
    grid-template-areas: 
        "pad     pad"
        "img     right"
        "img     name"
        "buttons info"
        "buttons info";
    grid-template-columns: 200px 1fr;
    grid-row-gap: .5rem;
    grid-column-gap: 20px;
    grid-template-rows: 100px 100px 100px 100px;

    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        filter: blur(24px);
        z-index: -1;
        background: radial-gradient(circle at top, rgb(40 42 54 / 0.8), rgb(40 42 54) 75%), no-repeat top 35% center / 100% url(${profileBanner});
    }

    .avatar {
        grid-area: img;
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }

    #name {
        grid-area: name;
        font-size: 2.5rem;
        font-weight: 800;
    }

    .buttons {
        grid-area: buttons;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .5rem;
    }

    .buttons button {
        width: 100%;
        height: 48px;
        font-weight: 700;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .5rem;
        border-radius: 4px;
        border: none;
        cursor: pointer;
    }

    .disabled {
        opacity: 0.5;
        cursor: none;
        pointer-events: none;
    }

    #follow-btn {
        background: var(--primary-btn-color);
    }

    .info {
        grid-area: info;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .label {
        font-weight: 700;
        font-size: 1.35rem;
        margin-block-end: 5px;
    }

    dt > div {
        margin-top: 5px;
    }

    .role {
        display: flex;
        align-items: center;
        padding: .125rem .5rem;
        background: #343746;
        font-size: revert;
        width: fit-content;
        gap: 5px;
        border-radius: 4px;
    }

    .light {
        width: .75rem;
        height: .75rem;
        border-radius: 50%;
        background: white;
    }

    .biography {
        font-size: 1.1rem;
    }

    .biography p {
        margin-bottom: 20px;
    }

    .manga-list {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    @media screen and (max-width: 980px){
        padding: 0 10px;
        .avatar {
            width: calc(150px + .5rem);
            height: calc(150px + .5rem);
        }
        padding-top: 3rem;
        grid-template-areas: 
        "pad     pad"
        "img     buttons"
        "img     buttons"
        "name    name"
        "info info"
        "info info";
        grid-template-rows: 75px 75px 75px 75px;
        grid-column-gap: 0;
        .buttons {
            justify-content: end;
        }

    }
`

