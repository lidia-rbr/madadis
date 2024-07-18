import Card from "../cards/ProductCardIndex";
import { ProductContext } from "../../utils/Context/ProductContext";
import { useContext } from "react";
import styled from "styled-components";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
`;

const LastProductTitleContainer = styled.div`
  height: 7vh;
  display: flex;
  padding-left: 20px;
  align-items: end;
  padding-left: 17px;
`;

const LastProductTitle = styled.h2`
  font-size: 18px;
`;

const StyledCarousel = styled(Carousel)`
  width: 80%;
  margin: auto;
  // heigth: 100px;
  width: 40%;
  position: relative;
  top: -30vh;
  right: -22vw;
  margin-bottom: 20px;
  margin-top: 20px;
  box-shadow: ${({ theme }) => theme.accent} 2px 5px 9px;
`;

const StyledCarouselItem = styled(Carousel.Item)`
  background-color: ${({ theme }) => theme.cards} // Duplicate
`;

const StyledItemContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.cards}; // Duplicate

  @media (max-width: 1024px) {
    display: block;
  }
`;

const StyledCarouselCaption = styled(Carousel.Caption)`
  color: ${({ theme }) => theme.text};
  position: sticky;
  font-size:0.8rem
`;

const CarouselImage = styled.img`
  width: 190px;
  height: 190px;
  position: relative;
  overflow: hidden;
  object-fit: contain;
`;

function LastProductSection() {
  const { products, loading } = useContext(ProductContext);
  if (loading) {
    return <div>is loading</div>;
  } else {
    // Sort products by createdAt date (descending)
    products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Get the last 6 products based on createdAt date
    // const lastSixProducts = products.slice(0, 6);
    const lastSixProducts = [products[0]];

    return (
      <>
        {/* <LastProductTitleContainer>
          <LastProductTitle>Discover our last products 🔥</LastProductTitle>
        </LastProductTitleContainer> */}
        <StyledCarousel>
          {lastSixProducts.map((product, index) => (
            <StyledCarouselItem>
              <StyledItemContainer>
                <Link to={`/product/${product.id}`}>
                  <CarouselImage src={product.images[0]} alt={product.title} />
                </Link>
                <StyledCarouselCaption>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p>{product.price}$</p>
                </StyledCarouselCaption>
              </StyledItemContainer>
            </StyledCarouselItem>
          ))}
        </StyledCarousel>
      </>
    );
  }
}

export default LastProductSection;
