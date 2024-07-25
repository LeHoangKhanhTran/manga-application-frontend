import { styled } from "styled-components";

interface ContainerProps {
    size: string
}
export const Container = styled.div<ContainerProps>`
  border: 3px solid var(--primary-btn-color);
  border-top: 3px solid var(--primary-text-color);
  border-radius: 50%;
  /* width: 1.35rem;
  height: 1.35rem; */
  width: ${props => props.size};
  height: ${props => props.size};
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`