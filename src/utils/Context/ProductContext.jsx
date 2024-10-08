import React, { createContext, useState, useEffect } from "react";
// import { useFetch } from '../hooks/GetProducts';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(["hello", "worldss"]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=0");
        const data = await response.json();
        setProducts(data.products);
        const dataCategories = [
          ...new Set(data.products.map((product) => product.category)),
        ];
        setCategories(dataCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, categories, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
