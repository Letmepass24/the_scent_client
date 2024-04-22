import React, { useState } from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  ${mobile({ marginRight: "0px" })};
`;

const Select = styled.select`
  margin-left: 20px;
  padding: 10px;
  ${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({ performance: "", occasion: "" });
  const [sort, setSort] = useState("new");

  const handleFilters = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <>
      <Navbar />
      <Announcement />
      <Title>{cat.toUpperCase()}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products</FilterText>
          <Select onChange={handleFilters} name="performance">
            <Option disabled selected>
              Performance
            </Option>
            <Option>Long Lasting</Option>
            <Option>Light</Option>
            <Option>4 hours</Option>
            <Option>Good</Option>
            <Option>Above average</Option>
          </Select>
          <Select onChange={handleFilters} name="occasion">
            <Option disabled selected>
              Occasion
            </Option>
            <Option>Office</Option>
            <Option>Events</Option>
            <Option>Attractive</Option>
            <Option>Party Events</Option>
            <Option>Everyday</Option>
            <Option>Date</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products</FilterText>
          <Select onChange={handleSort}>
            <Option disabled selected>
              Newest
            </Option>
            <Option value="asc">Low to High</Option>
            <Option value="desc">High to Low</Option>
          </Select>
        </Filter>
      </FilterContainer>

      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </>
  );
};

export default ProductList;
