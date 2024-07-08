import styled from "styled-components";
interface RandomProps {
    isNavBarHidden: boolean
}
export const Container = styled.div<RandomProps>`
    position: absolute;
    width: ${props => props.isNavBarHidden ? "100%" : "calc(100% - 260px)"};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 1.7rem;
`
export const Spinner = styled.div`
  border: 3px solid var(--primary-btn-color);
  border-top: 3px solid var(--primary-text-color);
  border-radius: 50%;
  width: 1.35rem;
  height: 1.35rem;
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