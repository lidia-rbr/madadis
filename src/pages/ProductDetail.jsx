import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../utils/hooks/GetProducts";
import styled from "styled-components";
import { Button } from "reactstrap";
import { CartContext } from "../utils/context/CartContext";
import Loader from "../components/loader/loaderIndex";

const ProductDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.productBackground};
`;

const ProductImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 15px;
`;

const ProductTitle = styled.h1`
  font-size: 24px;
  margin: 20px 0;
  color: ${({ theme }) => theme.text};
`;

const ProductPrice = styled.div`
  font-size: 22px;
  color: background-color: ${({ theme }) => theme.text};
  font-weight: bold;
  margin: 10px 0;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  margin: 10px 0;
  max-width: 70%;
`;

const ProductInfo = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
`;

const InfoLabel = styled.span`
  font-weight: bold;
`;

const ReviewsSection = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
`;

const Review = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const ReviewerName = styled.div`
  font-weight: bold;
`;

const ReviewDate = styled.div`
  font-size: 12px;
  color: grey;
`;

const ReviewRating = styled.div`
  color: gold;
`;

const ReviewComment = styled.div`
  margin: 10px 0;
`;

const AddToCartButton = styled(Button)`
  color: white;
  text-decoration: none;
  padding: 0.6rem 2rem;
  margin-top: 1rem;
  display: inline-block;
`;

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { isLoading, data, error } = useFetch(
    `https://dummyjson.com/products/${id}`,
  );
  if (!data) {
    return <div>Product not found</div>;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    console.log(error);
  }

  const handleAddToCart = () => {
    const item = {
      title: data.title,
      description: data.description,
      picture: data.images[0],
      price: data.price.toFixed(2),
      id: data.id,
      quantity: 1,
    };
    addToCart(item);
  };

  return (
    <ProductDetailWrapper>
      <ProductImage src={data.images[0]} alt={data.title} />
      <ProductTitle>{data.title}</ProductTitle>
      <ProductPrice>${data.price.toFixed(2)}</ProductPrice>
      <ProductDescription>{data.description}</ProductDescription>
      <AddToCartButton onClick={handleAddToCart}>
        🛒 Add to cart
      </AddToCartButton>

      <ProductInfo>
        <div>
          <InfoLabel>Category:</InfoLabel> {data.category}
        </div>
        <div>
          <InfoLabel>Brand:</InfoLabel> {data.brand}
        </div>
        <div>
          <InfoLabel>SKU:</InfoLabel> {data.sku}
        </div>
        <div>
          <InfoLabel>Weight:</InfoLabel> {data.weight}g
        </div>
        <div>
          <InfoLabel>Dimensions:</InfoLabel> {data.dimensions.width}cm (W) x{" "}
          {data.dimensions.height}cm (H) x {data.dimensions.depth}cm (D)
        </div>
        <div>
          <InfoLabel>Warranty:</InfoLabel> {data.warrantyInformation}
        </div>
        <div>
          <InfoLabel>Shipping Info:</InfoLabel> {data.shippingInformation}
        </div>
        <div>
          <InfoLabel>Availability:</InfoLabel> {data.availabilityStatus}
        </div>
        <div>
          <InfoLabel>Return Policy:</InfoLabel> {data.returnPolicy}
        </div>
        <div>
          <InfoLabel>Minimum Order Quantity:</InfoLabel>{" "}
          {data.minimumOrderQuantity}
        </div>
      </ProductInfo>

      <ReviewsSection>
        <h2>Reviews</h2>
        {data.reviews.map((review, index) => (
          <Review key={index}>
            <ReviewerName>{review.reviewerName}</ReviewerName>
            <ReviewDate>
              {new Date(review.date).toLocaleDateString()}
            </ReviewDate>
            <ReviewRating>{"⭐".repeat(review.rating)}</ReviewRating>
            <ReviewComment>{review.comment}</ReviewComment>
          </Review>
        ))}
      </ReviewsSection>
    </ProductDetailWrapper>
  );
};

export default ProductDetail;
