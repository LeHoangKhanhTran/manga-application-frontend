import { Container } from "./StatusTag.style";

interface StatusTagProps {
    status: "Ongoing" | "Completed" | "Hiatus" | "Cancelled" | undefined,
    showPublication?: boolean,
    showBackground?: boolean,
    isUppercase?: boolean
}
export default function StatusTag({ status, showPublication = false, showBackground = true, isUppercase = false }: StatusTagProps) {
    if (status) {
        return (
            <Container status={status} showBackground={showBackground} isUppercase={isUppercase}>
                <div className="status-light"></div>
                <div>{showPublication && "Publication: "} {status}</div>
            </Container>
        )
    }
}