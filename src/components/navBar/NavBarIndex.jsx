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

  @media (max-width: 600px) {
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
    display: ${({ isOpen }) => (isOpen ? "grid" : "none")};
    transition:
      max-height 0.1s ease-in-out,
      opacity 0.1s ease-in-out;
    position: inherit;
    flex-direction: column;
    width: 100%;
    max-height: none;
    top: 0px;
    padding-top: 65px;
    flex-direction: row;
    background-color: ${({ theme }) => theme.accent};
    box-shadow: #f39c121f 0px 0px 20px 2px;
  }
`;

const NightModeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const BurgerButton = styled.div`
  display: none;
  cursor: pointer;
  padding: 15px;
  z-index: 2;

  @media (max-width: 600px) {
    display: block;
  }
`;

const Line = styled.div`
  width: 25px;
  height: 3px;
  background-color: ${({ theme }) => theme.primary};
  margin: 4px 0;
`;

const CartLink = styled(StyledLink)`
  animation: ${({ isBouncing }) => (isBouncing ? bounce : "none")} 0.5s ease;
`;

const NavComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { cart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  let nbOfItemsInCart = 0;
  cart.forEach((item) => {
    nbOfItemsInCart += item.quantity;
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
      <BurgerButton onClick={toggleMenu}>
        <Line />
        <Line />
        <Line />
      </BurgerButton>
      <StyledLeftNav isOpen={isOpen}>
        <StyledLink smooth={true} duration={500} onClick={toggleMenu} to="/">
          Home
        </StyledLink>
        <StyledLink
          smooth={true}
          duration={500}
          onClick={toggleMenu}
          to="/Products"
        >
          Products
        </StyledLink>
        <StyledLink
          smooth={true}
          duration={500}
          onClick={toggleMenu}
          to="/Categories"
        >
          Categories
        </StyledLink>
        <StyledLink
          smooth={true}
          duration={500}
          onClick={toggleMenu}
          to="/Contact"
        >
          Contact
        </StyledLink>
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
