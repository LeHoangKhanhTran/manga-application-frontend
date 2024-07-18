import { Container } from "./StatusBadge.style";

interface StatusBadgeProps {
    status: "Ongoing" | "Completed" | "Hiatus" | "Cancelled" | undefined,
    showPublication?: boolean,
    showBackground?: boolean,
    isUppercase?: boolean
}
export default function StatusBadge({ status, showPublication = false, showBackground = true, isUppercase = false }: StatusBadgeProps) {
    if (status) {
        return (
            <Container status={status} showBackground={showBackground} isUppercase={isUppercase}>
                <div className="status-light"></div>
                <div>{showPublication && "Publication: "} {status}</div>
            </Container>
        )
    }
}