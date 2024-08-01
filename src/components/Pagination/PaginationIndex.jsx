import PropTypes from "prop-types";
import styled from "styled-components";
import colors from "../../utils/colors/colors";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const CardLabel = styled.div`
  color: black;
  font-size: 22px;
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
  font-size: 12px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: ${colors.backgroundLight};
  border-radius: 30px;
  transition: 200ms;
  align-items: center;
  justify-content: space-evenly;
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
`;

const CardButton = styled(Button)`
  background-color: dodgerblue;
  color: white;
  text-decoration: none;
  padding: 0.6rem 2rem;
  margin-top: 1rem;
  display: inline-block;
`;

function Card({ title, description, picture, price, link }) {
  return (
    <CardWrapper>
      <CardLink to={link}>
        <CardLabel>{title}</CardLabel>
        <CardImage src={picture} alt="freelance" />
        <CardPrice>{price}$</CardPrice>
        <CardDescription>{description}</CardDescription>
        <CardButton>Add to cart</CardButton>
      </CardLink>
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
