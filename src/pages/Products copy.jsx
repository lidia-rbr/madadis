// import React, { useContext, useState, useEffect } from "react";
// import Card from "../components/cards/ProductCardIndex";
// import { ProductContext } from "../utils/Context/ProductContext";
// import styled from "styled-components";
// import { useLocation } from "react-router-dom";
// import Loader from "../components/loader/loaderIndex";
// import { Pagination } from "react-bootstrap";
// import Dropdown from "react-bootstrap/Dropdown";
// import { Link } from "react-router-dom";
// import { useFetch } from "../utils/hooks/GetProducts";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// const CardContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 20px;
//   padding: 20px;
//   background: radial-gradient(
//     circle,
//     ${({ theme }) => theme.primary} 0%,
//     ${({ theme }) => theme.secondary} 100%
//   );
// `;

// const StyledPagination = styled(Pagination)`
//   display: flex;
//   justify-content: center;
//   padding: 10px;
//   .page-item {
//     margin: 0 5px;
//   }
//   .page-link {
//     padding: 5px 10px;
//     font-size: 14px;
//     background-color: transparent;
//     border: none;
//     color: ${({ theme }) => theme.text};
//   }
//   .page-item.active {
//     background-color: ${({ theme }) => theme.productBackground};
//     border-radius: 50%;
//   }
// `;

// const FilterDiv = styled.div`
//   display: flex;
//   background-color: ${({ theme }) => theme.productBackground};
//   align-items: center;
//   padding: 20px;
//   margin-top: 60px;
// `;

// const CategoryDisplayed = styled.h1`
//   float: right;
//   margin-left: auto;
//   color: ${({ theme }) => theme.primary};
//   text-align: right;
// `;

// const StyledDropdownToggle = styled(Dropdown.Toggle)`
//   background-color: transparent !important;
//   border: none !important;
//   color: ${({ theme }) => theme.primary} !important;
//   &:hover {
//     color: ${({ theme }) => theme.nav};
//     background-color: ${({ theme }) => theme.accent} !important;
//     color: black;
//     border-radius: 30px;
//     transition: 200ms;
//   }
//   &:active {
//     background-color: transparent !important;
//     color: ${({ theme }) => theme.nav} !important;
//     border-radius: 30px;
//     transition: 200ms;
//   }
//   &:show,
//   &:link {
//     color: red !important;
//   }
// `;

// const StyledMenu = styled(Dropdown.Menu)`
//   background-color: ${({ theme }) => theme.dropDownMenu};
//   box-shadow: #1515159c 0px 8px 24px;
//   border: none;
// `;

// const StyledItem = styled(Dropdown.Item)`
//   text-decoration: none;
//   &:hover {
//     background-color: ${({ theme }) => theme.nav};
//   }
//   &:active {
//     background-color: ${({ theme }) => theme.nav};
//   }
// `;

// const StyledLink = styled(Link)`
//   text-decoration: none;
//   color: ${({ theme }) => theme.nav};
// `;

// const Products = () => {
//   const { loading, products, error } = useFetch(
//     "https://dummyjson.com/products"
//   );

//   // // Check if any category filter applied
//   // const query = useQuery();
//   // const category = query.get("category");
//   // const filteredProducts = category
//   //   ? products.filter((product) => product.category === category)
//   //   : products;

//   // const [selectedCategory, setSelectedCategory] = useState(category);

//   // // Count item by category
//   // let categoryCounts = products
//   //   ? products.reduce((acc, product) => {
//   //       acc[product.category] = (acc[product.category] || 0) + 1;
//   //       return acc;
//   //     }, {})
//   //   : "";

//   // // Pagination setup
//   // const [currentPage, setCurrentPage] = useState(1);
//   // const productsPerPage = 12;

//   // useEffect(() => {
//   //   setCurrentPage(1); // Reset page when category changes
//   // }, [category]);

//   // const onPageChange = (pageNumber) => {
//   //   setCurrentPage(pageNumber);
//   // };

//   if (loading) {
//     return <Loader />;
//   }

//   // const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   // // Logic to calculate the range of page numbers to display
//   // const pageRange = 2; // Number of pages to display on either side of the current page
//   // let startPage = currentPage - pageRange;
//   // let endPage = currentPage + pageRange;

//   // // Calculate start and end page to display on the navigation
//   // if (startPage < 1) {
//   //   startPage = 1;
//   //   endPage = Math.min(startPage + 2 * pageRange, totalPages);
//   // }

//   // if (endPage > totalPages) {
//   //   endPage = totalPages;
//   //   startPage = Math.max(endPage - 2 * pageRange, 1);
//   // }

//   // const pageNumbers = [];
//   // for (let number = startPage; number <= endPage; number++) {
//   //   pageNumbers.push(
//   //     <Pagination.Item
//   //       key={number}
//   //       active={number === currentPage}
//   //       onClick={() => onPageChange(number)}
//   //     >
//   //       {number}
//   //     </Pagination.Item>
//   //   );
//   // }

//   // const handleCategorySelect = (category) => {
//   //   setSelectedCategory(category);
//   // };

//   return (
//     <>
//       {/* <FilterDiv>
//         <Dropdown onSelect={handleCategorySelect}>
//           <StyledDropdownToggle id="dropdown-basic">
//             Filter by category
//           </StyledDropdownToggle>
//           <StyledMenu>
//             <StyledItem eventKey="Discover all of our products">
//               <StyledLink to={`/products`}>All ({products.length})</StyledLink>
//             </StyledItem>
//             {categories.map((category) => (
//               <StyledItem key={category} eventKey={category}>
//                 <StyledLink to={`/products?category=${category}`}>
//                   {category} ({categoryCounts[category]})
//                 </StyledLink>
//               </StyledItem>
//             ))}
//           </StyledMenu>
//         </Dropdown>
//         <CategoryDisplayed>
//           {selectedCategory ? selectedCategory : "Discover all of our products"}
//         </CategoryDisplayed>
//       </FilterDiv> */}
//       <CardContainer>
//         {/* Display products for the current page */}
//         {products

//           .map((product) => (
//             <Card
//               key={product.id}
//               title={product.title}
//               description={product.description}
//               price={product.price}
//               picture={product.images[0]}
//               link={`/product/${product.id}`}
//               id={product.id}
//             />
//           ))}
//       </CardContainer>
//       {/* Pagination component
//       {totalPages > 1 && (
//         <StyledPagination>
//           <Pagination.First onClick={() => onPageChange(1)} />
//           <Pagination.Prev
//             onClick={() => onPageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//           />

//           {startPage > 1 && <Pagination.Ellipsis />}

//           {pageNumbers}

//           {endPage < totalPages && <Pagination.Ellipsis />}

//           <Pagination.Next
//             onClick={() => onPageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//           />
//           <Pagination.Last onClick={() => onPageChange(totalPages)} />
//         </StyledPagination>
//       )} */}
//     </>
//   );
// };

// export default Products;
