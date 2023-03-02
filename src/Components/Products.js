import React from "react";
//const router = express.Router;
//const { getProducts } = require("/server/db/products");

const Products = ({ products }) => {
  return (
    <ul>
      {products.map((product) => {
        return (
          <li key={product.id}>
            {product.name}; description is; {product.description}
          </li>
        );
      })}
    </ul>
  );
};

export default Products;
//module.exports = router;
