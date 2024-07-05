import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: ${({ theme }) => theme.mainTitleColor};
  border-radius: 10px;
  transition: 200ms;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px grey;
  }
`;

const CardLabel = styled.div`
  color: black;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
`;

const CategoryLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

function CategoryCard({ category, count }) {
  return (
    <CategoryLink to={`/products?category=${category}`}>
      <CardWrapper>
        <CardLabel>{category} ({count})</CardLabel>
      </CardWrapper>
    </CategoryLink>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryCard;