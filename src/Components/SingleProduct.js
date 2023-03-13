import React from "react";
import { useParams, link } from "react-router-dom";
import { useEffect, useState } from "react";

const SingleProduct = ({}) => {
  const [singleProduct, setSingleProduct] = useState({});
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((response) => response.json())
      .then((singleProduct) => {
        setSingleProduct(singleProduct);
        
      });
  }, []);

  return (
    <div class="single-game-container">

      <div class="game-image-container">
      <img src={singleProduct.image_url} />
      </div>

      <div class="game-details-container">

      <h1>{singleProduct.name}</h1>
      <p>{singleProduct.description}</p>
      <p>Price: ${singleProduct.price}</p>
      <p>Condition: {singleProduct.condition}</p>
      <p>{singleProduct.onSale}</p>
      <button>Add to Cart</button>

      </div>
    </div>
  );
};

export default SingleProduct;
