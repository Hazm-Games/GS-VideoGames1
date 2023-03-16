import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate, useParams } from "react-router-dom";




const Products = ({ products, setCart }) => {
  const navigate = useNavigate();
  const { term } = useParams();

  const addProductToCart = async (productId) => {
    console.log(productId)
    const token = window.localStorage.getItem('token');
    if (!token) return;
    const response = await fetch(`/api/cart/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    const updatedCart = await response.json();
    console.log(updatedCart)
    return updatedCart;
  };

  return (
    <div className="games-shelf">
    <ul>
     <h2 className="search-title">Search for a game</h2>
      <input
        placeholder="search for games"
        onChange={(ev) => {
          navigate(`/products/search/${ev.target.value}`);
          console.log(ev.target.value);
        }}
      />
      <ul className="game-grid">
      {products
        .filter((product) => {
          return !term || product.name.includes(term);
        })
        
        .map((product) => {
          return (
            <li className="nostyle" key={product.id}>
              <h3>
                
                <Link to={`/products/${product.id}`}>
                {''}
                <div className="game-card">
                <img src={product.image_url} />
                {product.name}
          <button
            onClick={async () => {
              const updatedCart = await addProductToCart(product.id);
              setCart(updatedCart);
            }}
          >
            Add to Cart
          </button>
            </div>
            </Link>
              </h3>
            </li>
          );
        })}
        </ul>
    </ul>
    </div>
  );
};

export default Products;
