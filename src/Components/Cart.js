import React from 'react';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const Cart = ({ cart, setCart }) => {
  const deleteProductFromCart = async (productId) => {
    const token = window.localStorage.getItem('token');
    if (!token) return;
    const response = await fetch(`/api/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    const updatedCart = await response.json();
    setCart(updatedCart);
    return updatedCart;
  };

  const purchaseCart = async () => {
    const token = window.localStorage.getItem('token');
    if (!token) return;
    const response = await fetch(`/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    const newCart = await response.json();
    setCart(newCart);
  };

  function ThankYou() {
    alert ("Confirm Purchase?");
   // document.write ("Thank you for your Purchase!");
  }
 // console.log('Cart: ', cart);
  return (
    <div className="cart-page-container">
      <h2>My cart items</h2>
      <ul>
        {cart.products?.map((product) => {
          return (

            

            <li className="items-in-cart">
              {product.name}${product.price}({product.quantity})
              <img className="cart-img" src={product.image_url} />
              <button
                className="deleteBtn"

                onClick={async () => {
                  const updatedCart = await deleteProductFromCart(product.id);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>

      <button className="cartBtn"

        onClick={async () => {
          const newCart = await purchaseCart(); ThankYou();
        }}
      >
        PURCHASE CART
      </button>
    </div>
  );
};





 export default Cart;
