import React from "react";

const Products = ({ products }) => {
  return (
    <ul>
      {products.map((product) => {
        return <li key={product.id}>{product.name};</li>;
      })}
    </ul>
  );
};

export default Products;
