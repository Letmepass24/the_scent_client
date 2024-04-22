import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { useEffect, useState } from "react";
import { mobile } from "../responsive";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ padding: "0", flexDirection: "column" })};
`;

const Products = ({ sort, cat, filters }) => {
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:6969/api/products?category=${cat}`
            : `http://localhost:6969/api/products`
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [cat]);

  useEffect(() => {
    if (!products) return;

    const filtered = products.filter((product) => {
      if (!product || !product.performance || !product.occasion) return false;

      const performance = filters?.performance;
      const occasion = filters?.occasion;

      const performanceMatch = !performance || product.performance.toLowerCase() === performance.toLowerCase();
      const occasionMatch = !occasion || product.occasion.some((o) => o.toLowerCase() === occasion.toLowerCase());

      return performanceMatch || occasionMatch;
    });

    if (sort === "new") {
      filtered.sort((a, b) => a.createdAt - b.createdAt);
    } else if (sort === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [sort, filters, products]);

  if (products === null) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {filteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
