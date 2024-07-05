import React from "react";
import styled from "styled-components";
import CategoryCard from "../components/cards/CategoryCardIndex";
import { useContext } from "react";
import { ProductContext } from "../utils/Context/ProductContext";
import Loader from "../components/loader/loaderIndex";

const CategoryPageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

function CategoryPage() {
  const { products, categories, loading } = useContext(ProductContext);

  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return <Loader />;
  }

  return (
    <CategoryPageWrapper>
      {categories.map((category) => (
        <CategoryCard key={category} category={category} count={categoryCounts[category]}/>
      ))}
    </CategoryPageWrapper>
  );
}

export default CategoryPage;