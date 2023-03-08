const client = require("./client");

//function to create a new cart
const createCart = async (userId) => {
  try {
    const SQL = `INSERT INTO cart ("userId") VALUES ($1) RETURNING *;`;
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
    SELECT * FROM carts
    WHERE user_id = $1 AND is_active = true;
  `;
  const response = await client.query(SQL, [userId]);
  const cart = response.rows[0];
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
const addProductToCart = async (cartId, productId, quantity) => {
  try {
    const SQL = `
      INSERT INTO cart_Products (cart_id, product_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const response = await client.query(SQL, [cartId, productId, quantity]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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
  UPDATE carts
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