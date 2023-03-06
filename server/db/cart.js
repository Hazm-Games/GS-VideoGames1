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

// function to get all products in a cart
const getCartProducts = async (cartId) => {
  try {
    const SQL = `
      SELECT p.*, cp.quantity
      FROM products p
      LEFT JOIN cart_Products cp ON p.id = cp.product_id
      WHERE cp.cart_id = $1;
    `;
    const response = await client.query(SQL, [cartId]);
    return response.rows;
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

//Create Purchase Cart function TODO 

module.exports = {
  createCart,
  addProductToCart,
  getCartProducts,
  updateCartProductQuantity,
  deleteCartProduct,
};
