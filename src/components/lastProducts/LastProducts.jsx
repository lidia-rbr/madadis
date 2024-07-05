import Card from "../cards/ProductCardIndex";
import { ProductContext } from "../../utils/Context/ProductContext";
import { useContext } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  background-color:${({ theme }) => theme.productBackground};
`;

// const LastProductTitleContainer = styled.div`
//   height: 5vh;
//   background-color: ${({ theme }) => theme.primary};
//   display: flex;
//   align-items: end;
//   margin-left: 2p;
//   padding-left: 17px;
// `;

// const LastProductTitle = styled.h2`
//   font-size: 18px;
//   color: ${({ theme }) => theme.accent};
// `;

function LastProductSection() {
  const { products, loading } = useContext(ProductContext);
  if (loading) {
    return <div>is loading</div>;
  } else {
    // Sort products by createdAt date (descending)
    products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Get the last 6 products based on createdAt date
    const lastSixProducts = products.slice(0, 6);

    return (
      <>
        {/* <LastProductTitleContainer>
          <LastProductTitle>Our last products 🔥</LastProductTitle>
        </LastProductTitleContainer> */}
        <CardContainer>
          {lastSixProducts.map((product, index) => (
            <>
              <Card
                key={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                picture={product.images[0]}
                link={`/product/${product.id}`}
                id={product.id}
              ></Card>
            </>
          ))}
        </CardContainer>
      </>
    );
  }
}

export default LastProductSection;
