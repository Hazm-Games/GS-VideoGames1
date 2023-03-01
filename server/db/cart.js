const client = require("./client");

const createCart = async ({ userId }) => {
  const SQL = `
      INSERT INTO cart("userId")
      VALUES($1) RETURNING *
    `;
  const response = await client.query(SQL, [userId]);
  return response.rows[0];
};

const assignNewCart = async (isPurchased) => {
  const newCart = isPurchased
    ? createCart(userId)
    : console.log("still shopping");
  return newCart;
};

module.exports = {
  createCart,
  assignNewCart,
};
