const client = require('./client');
const {
  getUserByToken,
  createUser,
  authenticate
} = require('./User');

const syncTables = async()=> {
  console.log("syncing tables");
  const SQL = `
  DROP TABLE IF EXISTS Cart_Products;
  DROP TABLE IF EXISTS Cart;
  DROP TABLE IF EXISTS Products;
  DROP TABLE IF EXISTS Platform;
  DROP TABLE IF EXISTS users;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
  );
  CREATE TABLE Platform(
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
    "platform_id" INTEGER NOT NULL REFERENCES Platform(id)
   );
   CREATE TABLE Cart(
    id  SERIAL  PRIMARY KEY,
    "user_id" INTEGER NOT NULL REFERENCES Users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    "isPurchased" BOOLEAN DEFAULT false
   );
   CREATE TABLE Cart_Products(
    id  SERIAL  PRIMARY KEY,
    "cart_id" INTEGER NOT NULL REFERENCES Cart(id),
    "product_id" INTEGER NOT NULL REFERENCES Products(id),
    quantity INTEGER NOT NULL
  );
  
  `;
  await client.query(SQL);
};

const syncAndSeed = async()=> {
  await syncTables();
  const [moe, lucy]  = await Promise.all([
    createUser({
      username: 'moe',
      password: 'moe_password'
    }),
    createUser({
      username: 'lucy',
      password: 'lucy_password'
    })
  ]);
  console.log('--- seeded users ---');
  console.log(moe);
  console.log(lucy);
};


 module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  getUserByToken,
  client
 };
