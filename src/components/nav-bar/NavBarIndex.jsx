import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../utils/context/ThemeContext";
import { CartContext } from "../../utils/context/CartContext";
import { UserContext } from "../../utils/context/UserContext";

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const StyledLink = styled(Link)`
  padding: 15px;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  color: ${({ theme }) => theme.nav};

  &:hover {
    background-color: ${({ theme }) => theme.mainTitleColor};
    color: black;
    border-radius: 30px;
    transition: 200ms;
  }
`;

const StyledNav = styled.nav`
  background-color: ${({ isScrolled, theme }) =>
    isScrolled ? theme.primary : "transparent"};
  display: flex;
  align-items: center;
  height: 60px;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const StyledRightNav = styled.div`
  float: right;
  margin-left: auto;
  display: flex;
  align-items: center;
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

const CartLink = styled(StyledLink)`
  animation: ${({ isBouncing }) => (isBouncing ? bounce : "none")} 0.5s ease;
`;

const NavComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { cart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  let nbOfItemsInCart = 0;
  cart.forEach((item) => {
    nbOfItemsInCart += item.quantity;
  });

  useEffect(() => {
    if (cart.length > 0) {
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cart]);

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
        <CartLink to="/cart" isBouncing={isBouncing}>
          Cart {nbOfItemsInCart}
        </CartLink>
        {user ? (
          <StyledLink to="/Profile">{user.firstName}</StyledLink>
        ) : (
          <StyledLink to="/login">Login</StyledLink>
        )}
      </StyledRightNav>
    </StyledNav>
  );
};

export default NavComponent;
