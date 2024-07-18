import styled from "styled-components";

interface StatusProps {
    status: "Ongoing" | "Completed" | "Hiatus" | "Cancelled" | undefined,
    showBackground: boolean,
    isUppercase: boolean
}

const statusColor = {
    Ongoing: "#50fa7b", 
    Completed: "#8be9fd",
    Hiatus: "#ffb86c",
    Cancelled: "#ff5555"
} as { [key: string]: string }

export const Container = styled.div<StatusProps>`
    display: flex;
    align-items: center;
    text-transform: ${props => props.isUppercase ? "uppercase" : ""};
    font-weight: 600;
    font-size: .95em;
    gap: 5px;
    background: ${props => props.showBackground ? "#282A36" : "none"};
    padding: ${props => props.showBackground ? "2.5px 6px 0px 6px" : ""};
    width: fit-content;
    border-radius: 4px;

    .status-light {
        position: relative;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${props => props.status !== undefined ? statusColor[props.status] : ""};
    }

    @media screen and (max-width: 580px) {
        padding: 0 6px;
        .status-light {
            top: -1px;
            width: 6px;
            height: 6px;
        }
    }
`