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

  console.log('Cart: ', cart);
  return (
    <div>
      <h2>My products:</h2>
      <ul>
        {cart.products?.map((product) => {
          return (
            <li>
              {product.name}({product.quantity})
              <button
                onClick={async () => {
                  const updatedCart = await deleteProductFromCart(product.id);
                }}
              >
                DELETE PRODUCT
              </button>
            </li>
          );
        })}
      </ul>
      <button
        onClick={async () => {
          const newCart = await purchaseCart();
        }}
      >
        PURCHASE CART
      </button>
    </div>
  );
};
// function Cart({ userId }) {
//   const [cart, setCart] = useState(null);

//   useEffect(() => {
//     fetch(`/api/cart`)
//       .then((response) => response.json())
//       .then((cart) => {
//        setCart(cart);
       
//       });
//   }, []);

//   useEffect(() => {
//     async function fetchCart() {
//       const cart = await getCartByUserId({ userId });
//       setCart(cart);
//     }
//     fetchCart();
//   }, [userId]);

//   if (!cart) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       <ul>
//         {cart.products.map((product) => (
//           <li key={product.id}>
//             {product.name} - Quantity: {product.quantity}
//             <button onClick={() => handleDelete(product.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       <button onClick={() => handlePurchase(cart.id)}>Purchase</button>
//     </div>
//   );

//   async function handleDelete(productId) {
//     await deleteCartProduct(productId);
//     const updatedCart = await getCartByUserId({ userId });
//     setCart(updatedCart);
//   }

//   async function handlePurchase(cartId) {
//     await purchaseCart({ cartId, userId });
//     const newCart = await createCart(userId);
//     setCart(newCart);
//   }
// }

 export default Cart;
