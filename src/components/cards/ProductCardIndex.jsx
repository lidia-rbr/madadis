import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { CartContext } from "../../utils/Context/CartContext";
import { useContext } from "react";

const CardLabel = styled.div`
  color: black;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

const CardPrice = styled.div`
  color: black;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;

const CardDescription = styled.div`
  color: black;
  font-size: 10px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  //   border-radius: 30px;
  transition: 200ms;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.mainTitleColor};
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px grey;
  }
`;
const CardImage = styled.img`
  width: 150px;
  height: 150px;
  position: relative;
  overflow: hidden;
  object-fit: cover;
`;

const CardLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const CardButton = styled(Button)`
  color: white;
  text-decoration: none;
  padding: 0.6rem 2rem;
  margin-top: 1rem;
  display: inline-block;
`;

function Card({ title, description, picture, price, link, id }) {
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = () => {
    const item = {
      title: title,
      description: description,
      picture: picture,
      price: price,
      id: id,
      quantity: 1,
    };
    addToCart(item);
  };
  return (
    <CardWrapper>
      <CardLink to={link}>
        <CardLabel>{title}</CardLabel>
        <CardImage src={picture} alt="freelance" />
        <CardPrice>{price}$</CardPrice>
        <CardDescription>{description}</CardDescription>
      </CardLink>
      <CardButton onClick={handleAddToCart}>🛒 Add to cart</CardButton>
    </CardWrapper>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
  picture: PropTypes.string,
  price: PropTypes.string,
};

export default Card;
