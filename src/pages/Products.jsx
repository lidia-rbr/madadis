import React, { useState } from "react";
import Card from "../components/cards/ProductCardIndex";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Loader from "../components/loader/loaderIndex";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { useFetch } from "../utils/hooks/GetProducts";

function useQuery() {
  const query = new URLSearchParams(useLocation().search);
  const category = query.get("category");
  return category ? category : "";
}

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
`;

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  padding: 10px;
  .page-item {
    margin: 0 5px;
  }
  .page-link {
    padding: 5px 10px;
    font-size: 14px;
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.text};
  }
  .page-item.active {
    background-color: ${({ theme }) => theme.productBackground};
    border-radius: 50%;
  }
`;

const FilterDiv = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.productBackground};
  align-items: center;
  padding: 20px;
  margin-top: 60px;
`;

const CategoryDisplayed = styled.h1`
  float: right;
  margin-left: auto;
  color: ${({ theme }) => theme.primary};
  text-align: right;
`;

const StyledDropdownToggle = styled(Dropdown.Toggle)`
  background-color: transparent !important;
  border: none !important;
  color: ${({ theme }) => theme.primary} !important;
  &:hover {
    color: ${({ theme }) => theme.nav};
    background-color: ${({ theme }) => theme.accent} !important;
    color: black;
    border-radius: 30px;
    transition: 200ms;
  }
  &:active {
    background-color: transparent !important;
    color: ${({ theme }) => theme.nav} !important;
    border-radius: 30px;
    transition: 200ms;
  }
  &:show,
  &:link {
    color: red !important;
  }
`;

const StyledMenu = styled(Dropdown.Menu)`
  background-color: ${({ theme }) => theme.dropDownMenu};
  box-shadow: #1515159c 0px 8px 24px;
  border: none;
`;

const StyledItem = styled(Dropdown.Item)`
  text-decoration: none;
  &:hover {
    background-color: ${({ theme }) => theme.nav};
  }
  &:active {
    background-color: ${({ theme }) => theme.nav};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.nav};
`;

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState(useQuery());
  const [firstProductIndex, setFirstProductIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const nbOfProductsPerPage = 30;

  // Get entire data set to define pagination
  const {
    isLoading: loadingTotal,
    data: totalData,
    error: errorTotal,
  } = useFetch(`https://dummyjson.com/products?limit=0`);

  // Get data set for current page
  const {
    isLoading: loadingPageProducts,
    data: pageProductsData,
    error: errorPageProducts,
  } = useFetch(
    `https://dummyjson.com/products?limit=${nbOfProductsPerPage}&skip=${firstProductIndex}`
  );

  if (loadingTotal || loadingPageProducts) {
    return <Loader />;
  }
  if (errorTotal || errorPageProducts) {
    return (
      <div>
        {errorTotal}
        {errorPageProducts}
      </div>
    );
  }

  const products = pageProductsData.products;
  const totalPages = totalData.products.length / nbOfProductsPerPage;
  const categories = [
    ...new Set(totalData.products.map((product) => product.category)),
  ];

  // Check if any category filter
  // As the API doesn't allow to filter by category, this will erase the navigation
  const filteredProducts =
    selectedCategory && selectedCategory !== "all"
      ? totalData.products.filter(
          (product) => product.category === selectedCategory
        )
      : products;

  // When user selects a category to filter on
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // When user uses navigation
  const handlePageChange = (pageIndex) => {
    setFirstProductIndex((pageIndex - 1) * nbOfProductsPerPage);
    setCurrentPageIndex(pageIndex);
  };

  const goToPreviousPage = () => {
    handlePageChange(currentPageIndex - 1);
  };

  const goToNextPage = () => {
    handlePageChange(currentPageIndex + 1);
  };

  return (
    <>
      <FilterDiv>
        <Dropdown onSelect={handleCategorySelect}>
          <StyledDropdownToggle id="dropdown-basic">
            Filter by category
          </StyledDropdownToggle>
          <StyledMenu>
            <StyledItem eventKey="all">
              <StyledLink to={`/products`}>All ({products.length})</StyledLink>
            </StyledItem>
            {categories.map((category) => (
              <StyledItem key={category} eventKey={category}>
                <StyledLink to={`/products?category=${category}`}>
                  {category}
                </StyledLink>
              </StyledItem>
            ))}
          </StyledMenu>
        </Dropdown>
        <CategoryDisplayed>
          {selectedCategory && selectedCategory !== "all"
            ? selectedCategory
            : "Discover all of our products"}
        </CategoryDisplayed>
      </FilterDiv>
      <CardContainer>
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            picture={product.images[0]}
            link={`/product/${product.id}`}
            id={product.id}
          />
        ))}
      </CardContainer>
      {selectedCategory === "all" && (
        <StyledPagination>
          <PaginationItem>
            <PaginationLink
              first
              href="#"
              onClick={() => handlePageChange(1)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              previous
              onClick={() => goToPreviousPage()}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationLink href="#" next onClick={() => goToNextPage()} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              last
              onClick={() => handlePageChange(totalPages)}
            />
          </PaginationItem>
        </StyledPagination>
      )}
    </>
  );
};

export default Products;
