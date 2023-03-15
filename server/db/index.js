const client = require("./client");
const { getUserByToken, createUser, authenticate } = require("./User");
const { createProduct } = require("./products");
const { addPlatform } = require("./platform");
const { myGames } = require("./data");
const { createCart } = require("./cart");

const syncTables = async () => {
  console.log("syncing tables");
  try {
    const SQL = `
  DROP TABLE IF EXISTS Cart_Products;
  DROP TABLE IF EXISTS Cart;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS platform;
  DROP TABLE IF EXISTS users;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
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
    user_id INTEGER NOT NULL REFERENCES Users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    is_purchased BOOLEAN DEFAULT false
   );
   CREATE TABLE cart_Products(
    id  SERIAL  PRIMARY KEY,
    cart_id INTEGER NOT NULL REFERENCES Cart(id),
    product_id INTEGER NOT NULL REFERENCES Products(id),
    quantity INTEGER NOT NULL
  );
  
  `;
    await client.query(SQL);
    console.log("Finished building tables");
  } catch (error) {
    console.error("error constructing tables");
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
  console.log(platformInsert);
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
        isAdmin: true
      }),

    ]);
    await createCart( 1 );
    await createCart( 2 );
    console.log("--- seeded users ---");
    console.log(moe);
    console.log(lucy);
    console.log("seeding platforms");
    console.log("seeding products");
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
  myGames
};
