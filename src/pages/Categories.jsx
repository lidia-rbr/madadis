import React from "react";
import styled from "styled-components";
import CategoryCard from "../components/cards/CategoryCardIndex";
import Loader from "../components/loader/loaderIndex";
import { useFetch } from "../utils/hooks/GetProducts";

const CategoryPageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  margin-top: 60px;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: 50vh;
`;

function CategoryPage() {
  const { isLoading, data, error } = useFetch(
    "https://dummyjson.com/products/categories"
  );

  if (isLoading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }
  if (error) {
    console.log(error);
  }

  return (
    <CategoryPageWrapper>
      {data.map((category) => (
        <CategoryCard
          key={category.name}
          slug={category.slug}
          category={category.name}
        />
      ))}
    </CategoryPageWrapper>
  );
}

export default CategoryPage;
