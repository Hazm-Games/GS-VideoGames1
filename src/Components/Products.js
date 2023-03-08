import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate, useParams } from "react-router-dom";

const Products = ({ products }) => {
  const navigate = useNavigate();
  const { term } = useParams();
  return (
    <ul>
      <input
        placeholder="search for games"
        onChange={(ev) => {
          navigate(`/products/search/${ev.target.value}`);
          console.log(ev.target.value);
        }}
      />
      {products
        .filter((product) => {
          return !term || product.name.includes(term);
        })
        .map((product) => {
          return (
            <li key={product.id}>
              <h3>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </h3>
            </li>
          );
        })}
    </ul>
  );
};

export default Products;
