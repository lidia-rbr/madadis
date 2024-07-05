import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../utils/Context/ThemeContext";
import { CartContext } from "../../utils/Context/CartContext";
// import logo from "../../assets/logo.jpg";

const StyledLink = styled(Link)`
  padding: 15px;
  color: black;
  text-decoration: none;
  color: ${({ theme }) => theme.nav};
  //   font-size: 18px;

  &:hover {
    background-color: ${({ theme }) => theme.mainTitleColor};
    color: black;
    border-radius: 30px;
    transition: 200ms;
  }
`;

const StyledNav = styled.nav`
  background-color: ${({ isScrolled, theme }) =>
    isScrolled ? theme.scrolledNavBar : "transparent"};
  display: flex;
  align-items: center;
  height: 60px;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  //   box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const StyledRightNav = styled.div`
  float: right;
  margin-left: auto;
`;

const StyledLeftNav = styled.div`
  float: left;
  margin-right: auto;
`;

const NightModeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

// const StyledLogo = styled.img`
//   height: 28px;
//   margin-left: 14px;
//   margin-right: 14px;
// `;

const NavComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { cart } = useContext(CartContext);
  let nbOfItemsInCart = 0;
  cart.forEach((item) => {
    nbOfItemsInCart += item.quantity;
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledNav isScrolled={isScrolled}>
      <StyledLeftNav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/Products">Products</StyledLink>
        <StyledLink to="/Categories">Categories</StyledLink>
        <StyledLink to="/Contact">Contact</StyledLink>
      </StyledLeftNav>
      <StyledRightNav>
        <NightModeButton onClick={() => toggleTheme()}>
          {theme === "light" ? "🌙" : "☀️"}
        </NightModeButton>
        <StyledLink to="/cart">Cart {nbOfItemsInCart}</StyledLink>
      </StyledRightNav>
    </StyledNav>
  );
};

export default NavComponent;
