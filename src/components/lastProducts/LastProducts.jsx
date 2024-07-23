import { ProductContext } from "../../utils/Context/ProductContext";
import { useContext } from "react";
import styled from "styled-components";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { CartContext } from "../../utils/Context/CartContext";
import Loader from "../loader/loaderIndex";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: 70vh;
`;

const StyledCarousel = styled(Carousel)`
  margin: auto;
  min-height: 70vh;
  width: 45%;
  position: relative;
  top: -30vh;
  right: -23vw;
  margin-bottom: 20px;
  margin-top: 20px;

  .carousel-indicators {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    padding: 0;
    margin-right: 15%;
    margin-bottom: -2rem;
    margin-left: 15%;

    button {
      filter: invert(1);
    }
  }
  .carousel-control-next,
  .carousel-control-prev {
    filter: invert(1);
  }
`;

const StyledCarouselItem = styled(Carousel.Item)`
  // box-shadow: ${({ theme }) => theme.accent} 2px 5px 9px;
`;

const StyledItemContainer = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  height: 70vh;
  overflow: hidden;
  display: flex;
  background-color: ${({ theme }) => theme.cards};
  box-shadow: ${({ theme }) => theme.accent} 2px 5px 9px;

  @media (max-width: 1024px) {
    display: block;
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
`;

const CardButton = styled(Button)`
  color: white;
  text-decoration: none;
  padding: 0.6rem 2rem;
  margin-top: 1rem;
  display: inline-block;
`;

function LastProductSection() {
  const { products, loading } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  if (loading) {
    return (
      <StyledCarousel>
        <StyledCarouselItem>
          <StyledItemContainer>
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          </StyledItemContainer>
        </StyledCarouselItem>
      </StyledCarousel>
    );
  } else {
    // Sort products by createdAt date (descending)
    products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Get the last 6 products based on createdAt date
    const lastSixProducts = products.slice(0, 6);
    // const lastSixProducts = [products[0]];

    const handleAddToCart = (id) => {
      const product = products.find((product) => product.id === id);
      const item = {
        title: product.title,
        description: product.description,
        picture: product.picture,
        price: product.price,
        id: id,
        quantity: 1,
      };
      addToCart(item);
    };

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
                  <CardButton onClick={() => handleAddToCart(product.id)}>
                    🛒 Add to cart
                  </CardButton>
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
