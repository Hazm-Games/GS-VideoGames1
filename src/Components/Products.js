import React from "react";
import { Link } from "react-router-dom";

const Products = ({ products }) => {
  return (
    <ul>
      {products.map((product) => {
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
