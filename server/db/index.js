const client = require("./client");
const { getUserByToken, createUser, authenticate } = require("./User");
const { createProduct } = require("./products");
const { addPlatform } = require("./platform");
const { myGames } = require("./data");
const { createCart } = require("./cart");

const syncTables = async () => {
  try {
    const SQL = `
  DROP TABLE IF EXISTS cart_Products;
  DROP TABLE IF EXISTS cart;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS platform;
  DROP TABLE IF EXISTS users;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    "phoneNumber" VARCHAR(100),
    "isAdmin" BOOLEAN DEFAULT false
  );
  CREATE TABLE platform(
    id  SERIAL  PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );
  CREATE TABLE products(
    id  SERIAL  PRIMARY KEY,
    name  VARCHAR(255)  UNIQUE NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    condition TEXT NOT NULL,
    platform_id INTEGER NOT NULL REFERENCES Platform(id),
    "onSale" BOOLEAN DEFAULT false
    );
   CREATE TABLE cart(
    id  SERIAL  PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    is_purchased BOOLEAN DEFAULT false
   );
   CREATE TABLE cart_Products(
    id  SERIAL  PRIMARY KEY,
    cart_id INTEGER NOT NULL REFERENCES cart(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER DEFAULT 1
  );
  
  `;
    await client.query(SQL);
  } catch (error) {
    throw error;
  }
};

const platformAdder = async () => {
  const [platformInsert] = await Promise.all([
    addPlatform({
      name: "Playstation",
    }),
    addPlatform({
      name: "Xbox",
    }),
    addPlatform({
      name: "Nintendo",
    }),
  ]);
};

const syncAndSeed = async () => {
  try {
    await syncTables();
    const [moe, lucy] = await Promise.all([
      createUser({
        username: "moe",
        password: "moe_password",
      }),
      createUser({
        username: "lucy",
        password: "lucy_password",
      }),
      createUser({
        username: "admin",
        password: "adminPassword",
        email: "admin@admin.com",
        phoneNumber: "904-222-2222",
        isAdmin: true,
      }),
    ]);
    const [moeCart, lucyCart] = await Promise.all([
      createCart({ userId: moe.id }),
      createCart({ userId: lucy.id }),
    ]);

    await platformAdder();

    for (let i = 0; i < myGames.length; i++) {
      await createProduct(myGames[i]);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  createProduct,
  getUserByToken,
  client,
  myGames,
};
