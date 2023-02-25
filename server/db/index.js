const client = require("./client");
const { getUserByToken, createUser, authenticate } = require("./User");
const { createProduct } = require("./products");
const { addPlatform } = require("./platform");

const syncTables = async () => {
  console.log("syncing tables");
  const SQL = `
  DROP TABLE IF EXISTS Cart_Products;
  DROP TABLE IF EXISTS Cart;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS platform;
  DROP TABLE IF EXISTS users;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
  );
  CREATE TABLE platform(
    id  SERIAL  PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );
  CREATE TABLE products(
    id  SERIAL  PRIMARY KEY,
    name  VARCHAR(255)  UNIQUE NOT NULL,
    description TEXT  NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    condition VARCHAR(10) NOT NULL,
    platform_id INTEGER NOT NULL REFERENCES Platform(id)
    );
   CREATE TABLE cart(
    id  SERIAL  PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES Users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    "isPurchased" BOOLEAN DEFAULT false
   );
   CREATE TABLE cart_Products(
    id  SERIAL  PRIMARY KEY,
    cart_id INTEGER NOT NULL REFERENCES Cart(id),
    product_id INTEGER NOT NULL REFERENCES Products(id),
    quantity INTEGER NOT NULL
  );
  
  `;
  await client.query(SQL);
};

const platformAdder = async () => {
  const [platformInsert] = await Promise.all([
    addPlatform({
      name: "XBOX"
    }),
    addPlatform({
      name: "Playstation"
    }),
    addPlatform({
      name: "Nintendo"
    }),
  ]);
  console.log(platformInsert);
};

const makeProducts = async () => {
  const [gameTest] = await Promise.all([
    createProduct({
      name: "gameTest",
      description: "descTest",
      price: "100",
      image_url: "words",
      condition: "New",
      platform_id: 1,
    }),
  ]);
  console.log(gameTest);
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
    ]);
    console.log("--- seeded users ---");
    console.log(moe);
    console.log(lucy);
    console.log("seeding platforms");
    console.log("seeding products");
    await platformAdder();
    await makeProducts();
    } catch (error) {
    console.log(error);
  }
};

module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  makeProducts,
  getUserByToken,
  client,
};
