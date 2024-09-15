import styled from "styled-components";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const StyledItemContainer = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  height: 70vw;
  overflow: hidden;
  background-color: ${({ theme }) => theme.cards};
  box-shadow: ${({ theme }) => theme.accent} 2px 5px 9px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  @media (max-width: 600px) {
    height: 60vh;
  }
`;

const StyledCarouselCaption = styled(Carousel.Caption)`
  color: ${({ theme }) => theme.text};
  position: sticky;
  font-size: 0.8rem;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 225px;
  position: relative;
  overflow: hidden;
  object-fit: contain;

  @media (max-width: 600px) {
    height: 175px;
  }
`;

const CardButton = styled(Button)`
  color: white;
  text-decoration: none;
  padding: 0.6rem 2rem;
  margin-top: 1rem;
  display: inline-block;
`;

export const LastProductSection = ({ product, handleAddToCart }) => {
  console.log("t1 product : ", product);
  return (
    <>
      <StyledItemContainer>
        <Link to={`/product/${product.id}`}>
          <CarouselImage src={product.images[0]} alt={product.title} />
        </Link>
        <StyledCarouselCaption>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>{product.price}$</p>
          <CardButton onClick={() => handleAddToCart(product.id)}>
            🛒 Add to cart
          </CardButton>
        </StyledCarouselCaption>
      </StyledItemContainer>
    </>
  );
};

export default LastProductSection;
