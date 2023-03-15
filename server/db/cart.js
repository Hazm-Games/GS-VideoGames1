const client = require("./client");

//function to create a new cart
const createCart = async ({userId}) => {
  try {
    const SQL = 
    `INSERT INTO cart (user_id)
     VALUES ($1)
     RETURNING *`;
    const response = await client.query(SQL, [userId]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// get cart by user id
const getCartByUserId = async ({ userId }) => {
  const SQL = `
    SELECT * FROM cart
    WHERE user_id = $1 AND is_purchased= true;
  `;
  const response = await client.query(SQL, [userId]);
  console.log(response)
  const cart = response.rows[0];
  console.log(cart)
  // get products, and attach to cart
  const productsSQL = `
  SELECT * FROM cart_products
  LEFT JOIN products ON cart_products.product_id = products.id
  WHERE cart_products.cart_id = $1
  `;
  const productsResponse = await client.query(productsSQL, [cart.id]);
  cart.products = productsResponse.rows;
  return cart;
};


// function to add a product to a cart
const addProductToCart = async (cartId, productId) => {
  try {
    const checkSQL = `
      INSERT INTO cart_Products (cart_id, product_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    
    const checkResponse = await client.query(checkSQL, [cartId, productId]);
  if (checkResponse.rows.length) {
    await client.query(
      `UPDATE cart_products SET quantity = quantity + 1 WHERE cart_id = $1 AND product_id = $2`,
      [cartId, productId]
    );
    return;
  }
  const SQL = `
    INSERT INTO cart_products(product_id, cart_id)
    VALUES($1, $2)
    RETURNING *
    `;
  await client.query(SQL, [productId, cartId]);
  return;
  
} catch (error) {
  console.error(error);
  throw error;
}
}

    
  

// function to update the quantity of a product in a cart
const updateCartProductQuantity = async (cartProductId, quantity) => {
  try {
    const SQL = `
      UPDATE cart_Products
      SET quantity = $1
      WHERE id = $2
      RETURNING *;
    `;
    const response = await client.query(SQL, [quantity, cartProductId]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// function to delete a product from a cart
const deleteCartProduct = async (cartProductId) => {
  try {
    const SQL = `
      DELETE FROM cart_Products
      WHERE id = $1;
    `;
    await client.query(SQL, [cartProductId]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

 
// purchase cart
const purchaseCart = async ({ cartId, userId }) => {
  const SQL = `
  UPDATE cart
  SET is_active = false
  WHERE id = $1
  `;
  await client.query(SQL, [cartId]);
  const newCart = await createCart({ userId });
  return newCart;
};




module.exports = {
  createCart,
  addProductToCart,
  getCartByUserId,
  updateCartProductQuantity,
  deleteCartProduct,
  purchaseCart,
};