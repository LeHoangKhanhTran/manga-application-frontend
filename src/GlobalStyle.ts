import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, input, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed, 
        figure, figcaption, footer, header, hgroup, 
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video {
	    margin: 0;
	    padding: 0;
	    border: 0;
	    font-size: 100%;
	    font: inherit;
	    vertical-align: baseline;
      box-sizing: border-box;
    }
    :root {
        --primary-background-color: #282A36;
        --secondary-background-color: #44475A;
        --primary-btn-color: #646cff;
        --primary-text-color: white;
        --input-background-color: #e8f0fe;
        --item-background-color: #343746;
        --item-background-dark-color: #292c38;
        --hover-background-color: #2f333b;
        --light-gray: #383e48;
        --banner-overlay-gradient: linear-gradient(67.81deg,rgba(0,0,0,.64) 35.51%,transparent);
        --banner-background: linear-gradient(to bottom,rgb(var(--md-background)/.6),rgb(var(--md-background)));
        font-family: 'League Spartan', sans-serif !important;
        line-height: 1.5;
        font-weight: 400;
        overflow-x: hidden;
        color-scheme: light dark;
        color: rgba(255, 255, 255, 0.87);
        background-color: var(--primary-background-color);
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #root {
      width: 100dvw;
      height: fit-content;
      min-height: 100%;
    }

    a {
        font-weight: 500;
        color: var(--primary-text-color);
        text-decoration: inherit;
    }

    ul {
        list-style-type: none;
    }

    /* width */
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background-color: inherit
      ; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: var(--light-gray); 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555; 
    }
`
export default GlobalStyle;

interface MainContentProps {
  isNavBarHidden: boolean
}
export const Main = styled.main`
  display: flex;
  color: var(--primary-text-color);
  
  .skeleton {
    animation: skeleton-animation 1.4s linear infinite alternate;
  }

  @keyframes skeleton-animation {
      0% {
        background: var(--item-background-color);
      }

      100% {
        background: var(--item-background-dark-color);
      }
  }

  .shimmer {
    color: grey;
    display: inline-block;
    mask: linear-gradient(
        120deg,
        rgba(0, 0, 0, 1) 20%, 
        rgba(0, 0, 0, 0.8) 30%, 
        rgba(0, 0, 0, 0.5) 40%, 
        rgba(0, 0, 0, 0.3) 50%, 
        rgba(0, 0, 0, 0.2) 60%, 
        rgba(0, 0, 0, 0.1) 70%, 
        rgba(0, 0, 0, 0) 80%
    ) right/250% 100%;
    animation: shimmer 2.5s alternate infinite;
    background-repeat: no-repeat;
}

@keyframes shimmer {
    100% {
        -webkit-mask-position: left;
    }
}
`
export const MainContent = styled.div<MainContentProps>`
  margin-left: ${props => props.isNavBarHidden ? "0" : "260px"};
  width: ${props => props.isNavBarHidden ? "100dvw" : "calc(100dvw - 260px)"};
  max-width: 100dvw;

  @media screen and (max-width: 780px){
      margin-left: 0;
      width: 100dvw;
  }
`


