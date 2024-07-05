import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../utils/Context/ProductContext';
import styled from "styled-components";
import { Button } from "reactstrap";
import { CartContext } from '../utils/Context/CartContext';

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
  color:${({ theme }) => theme.text};
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
  max-width:70%
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
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    const item = {
      title: product.title,
      description: product.description,
      picture: product.images[0],
      price: product.price.toFixed(2),
      id: product.id,
      quantity: 1,
    };
    addToCart(item);
  };

  return (
    <ProductDetailWrapper>
      <ProductImage src={product.images[0]} alt={product.title} />
      <ProductTitle>{product.title}</ProductTitle>
      <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
      <ProductDescription>{product.description}</ProductDescription>
      <AddToCartButton onClick={handleAddToCart}>🛒 Add to cart</AddToCartButton>
      
      <ProductInfo>
        <div>
          <InfoLabel>Category:</InfoLabel> {product.category}
        </div>
        <div>
          <InfoLabel>Brand:</InfoLabel> {product.brand}
        </div>
        <div>
          <InfoLabel>SKU:</InfoLabel> {product.sku}
        </div>
        <div>
          <InfoLabel>Weight:</InfoLabel> {product.weight}g
        </div>
        <div>
          <InfoLabel>Dimensions:</InfoLabel> {product.dimensions.width}cm (W) x {product.dimensions.height}cm (H) x {product.dimensions.depth}cm (D)
        </div>
        <div>
          <InfoLabel>Warranty:</InfoLabel> {product.warrantyInformation}
        </div>
        <div>
          <InfoLabel>Shipping Info:</InfoLabel> {product.shippingInformation}
        </div>
        <div>
          <InfoLabel>Availability:</InfoLabel> {product.availabilityStatus}
        </div>
        <div>
          <InfoLabel>Return Policy:</InfoLabel> {product.returnPolicy}
        </div>
        <div>
          <InfoLabel>Minimum Order Quantity:</InfoLabel> {product.minimumOrderQuantity}
        </div>
      </ProductInfo>

      <ReviewsSection>
        <h2>Reviews</h2>
        {product.reviews.map((review, index) => (
          <Review key={index}>
            <ReviewerName>{review.reviewerName}</ReviewerName>
            <ReviewDate>{new Date(review.date).toLocaleDateString()}</ReviewDate>
            <ReviewRating>{'⭐'.repeat(review.rating)}</ReviewRating>
            <ReviewComment>{review.comment}</ReviewComment>
          </Review>
        ))}
      </ReviewsSection>
    </ProductDetailWrapper>
  );
}

export default ProductDetail;