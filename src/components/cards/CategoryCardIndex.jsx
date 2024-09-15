import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 10px;
  transition: 200ms;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 200px; // Set a fixed width
  height: 100px; // Set a fixed height
  background-color: ${({ theme }) => theme.contactUs};
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px grey;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const CardLabel = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  text-align: center;
`;

const CategoryLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

function CategoryCard({ slug, category }) {
  return (
    <CategoryLink to={`/products?category=${slug}`}>
      <CardWrapper>
        <CardLabel>{category}</CardLabel>
      </CardWrapper>
    </CategoryLink>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryCard;
