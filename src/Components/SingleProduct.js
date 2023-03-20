import React from "react";
import { useParams, link } from "react-router-dom";
import { useEffect, useState } from "react";

const addProductToCart = async (productId) => {
  const token = window.localStorage.getItem("token");
  if (!token) return;
  const response = await fetch(`/api/cart/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  const updatedCart = await response.json();
  return updatedCart;
};

const SingleProduct = ({ setCart, updatedCart }) => {
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

  function areYouSure() {
    alert("Game added to Cart");
  }

  return (
    <div className="single-game-container">
      <div className="game-image-container">
        <img src={singleProduct.image_url} />
      </div>

      <div className="game-details-container">
        <h1>{singleProduct.name}</h1>
        <p>{singleProduct.description}</p>
        <p>Price: ${singleProduct.price}</p>
        <p>Condition: {singleProduct.condition}</p>
        <p>{singleProduct.onSale}</p>
        <button
          className="addtocartBtn"
          onClick={async () => {
            const updatedCart = await addProductToCart(singleProduct.id);
            areYouSure();
            setCart(updatedCart);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
