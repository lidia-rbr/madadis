import { useContext } from "react";
import { createGlobalStyle } from "styled-components";
import { ThemeContext } from "../Context/ThemeContext";

function GlobalStyle() {
  const { theme } = useContext(ThemeContext);
  const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }

  body {  
  min-height: 100vh;
  background-color: ${({ theme }) => theme.body};
  }

  .custom-shape-divider-bottom-1720480589 {
    margin-top:auto;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
}

.custom-shape-divider-bottom-1720480589 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 55px;
}

.custom-shape-divider-bottom-1720480589 .shape-fill {
    fill: ${({ theme }) => theme.body};
          // transition: fill 0s ease-in;
}

`;

  return <StyledGlobalStyle isDarkMode={theme === "dark"} />;
}

export default GlobalStyle;
