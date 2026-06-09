import { useEffect, useState } from "react";

import {
  Container,
} from "@mui/material";

import productService from "../../services/productService";
import categoryService from "../../services/categoryService";


import ProductGrid from "../../components/products/ProductGrid";
import ProductFilters from "../../components/products/ProductFilters";

function HomePage() {
  const [products, setProducts] =
    useState([]);

  const [categories, setCategories] =
    useState([]);
    

  const [selectedCategory,
    setSelectedCategory] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const data =
        await categoryService.getAll();

      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProducts = async () => {
    try {
      const params = {};

      if (selectedCategory) {
        params.categoryId =
          selectedCategory;
      }

      const data =
        await productService.getAll(
          params
        );

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container sx={{ py: 5 }}>
      <ProductGrid products={products}/>
    </Container>
  );
}

export default HomePage;