import { styled } from "styled-components"
export const Container = styled.section`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1em;
    & span {
        transform: translateY(1.9px);
    }

    .rate, .bookmark, .visibility {
        display: flex;
        align-items: center;
        height: 24px;
        line-height: 24px;
        text-align: center;
        gap: 4px;
        font-size: 1.25em;
        cursor: pointer;
    }

    .rate {
        position: relative;
        color: var(--primary-btn-color);
    }

    @media screen and (max-width: 580px) {
        .rate, .bookmark, .visibility {
            height: 20px;
            line-height: 20px;
            font-size: 1.25em;
        }

        .icon {
            width: 12px;
            height: 12px;
        }
    }
`