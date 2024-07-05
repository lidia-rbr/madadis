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
background: radial-gradient(circle, 
${({ theme }) => theme.gradientPurple} 0%, 
${({ theme }) => theme.gradientBlue} 50%, 
${({ theme }) => theme.gradientPink} 100%);
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
    padding-top:60px
  }
`;

  return <StyledGlobalStyle isDarkMode={theme === "dark"} />;
}

export default GlobalStyle;
