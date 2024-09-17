import { ProductContext } from "../../utils/context/ProductContext";
import { useCallback, useMemo, useContext } from "react";
import styled from "styled-components";
import Carousel from "react-bootstrap/Carousel";
import { CartContext } from "../../utils/context/CartContext";
import Loader from "../loader/loaderIndex";
import LastProductSection from "../last-product/LastProduct";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: 70vw;
`;

const StyledCarousel = styled(Carousel)`
  margin: auto;
  min-height: 70vw;
  width: 45%;
  position: relative;
  top: -49vh;
  right: -25vw;
  margin-bottom: -40vh;
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

  @media (max-width: 600px) {
    margin: auto;
    min-height: 60vh;
    width: 85%;
    top: -19vh;
    right: 0;
    margin-bottom: 20px;
    margin-top: 20px;
  }
`;

const StyledCarouselItem = styled(Carousel.Item)`
  // box-shadow: ${({ theme }) => theme.accent} 2px 5px 9px;
`;

const StyledItemContainer = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  background-color: ${({ theme }) => theme.cards};
  box-shadow: ${({ theme }) => theme.accent} 2px 5px 9px;

  @media (max-width: 1024px) {
    display: block;
  }

  @media (max-width: 600px) {
    height: 60vh;
  }
`;

function LastProductsSection() {
  const { products: contextProducts, loading } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  // Sort products by createdAt date (descending)
  const products = useMemo(
    () =>
      contextProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        [contextProducts]
      ),
    [contextProducts]
  );

  // Get the last 6 products based on createdAt date
  // const lastSixProducts = products.slice(0, 6);
  const lastSixProducts = useMemo(
    () => contextProducts.slice(0, 6),
    [contextProducts]
  );

  const handleAddToCart = useCallback(
    (id) => {
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
    },
    [addToCart, products]
  );

  console.log("t1 lastProducts : ", { lastSixProducts, products });

  return (
    <>
      <StyledCarousel>
        {loading ? (
          <StyledCarouselItem>
            <StyledItemContainer>
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            </StyledItemContainer>
          </StyledCarouselItem>
        ) : (
          lastSixProducts.map((product) => (
            <StyledCarouselItem key={product.id}>
              <LastProductSection
                product={product}
                handleAddToCart={handleAddToCart}
              />
            </StyledCarouselItem>
          ))
        )}
      </StyledCarousel>
    </>
  );
}

export default LastProductsSection;
