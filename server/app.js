const express = require("express");
const app = express();
const path = require("path");
const { getCartByUserId, createCart, deleteCartProduct, updateCartProductQuantity, purchaseCart, addProductToCart } = require("./db/cart");
const { getProducts, getSingleProduct, getNintendoProducts, getPlaystationProducts, getXboxProducts, getDealProducts } = require("./db/products");
const {getUserByToken} = require("./db/User") 
app.use(express.json());

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));



app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../static/index.html"))
);


app.use("/api/auth", require("./api/auth"));

app.get("/api/products", async (req, res) => {
  const products = await getProducts();
  res.send(products);
});


app.get('/api/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  const cart = await getCartByUserId({ userId });
  res.send(cart);
});

app.post('/api/cart', async (req, res) => {
  const user = await getUserByToken(req.headers.authorization);
  const cart = await getCartByUserId({ userId: user.id });
  const newCart = await purchaseCart({ cartId: cart.id, userId: user.id });
  res.send(newCart);
});

app.post('/api/cart/:productId', async (req, res) => {
  const { productId } = req.params;
  const user = await getUserByToken(req.headers.authorization);
  if (!user) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
  const cart = await getCartByUserId({ userId: user.id });
  await addProductToCart({ cartId: cart.id,  productId });
  const updatedCart = await getCartByUserId({ userId: user.id });
  res.send(updatedCart);
});

app.delete('/api/cart/:productId', async (req, res) => {
  const { productId } = req.params;
  const user = await getUserByToken(req.headers.authorization);
  if (!user) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
  const cart = await getCartByUserId({ userId: user.id });
  await deleteCartProduct({ cartId: cart.id, productId });
  const updatedCart = await getCartByUserId({ userId: user.id });
  res.send(updatedCart);
});


app.get("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  const singleProduct = await getSingleProduct(id);
  res.send(singleProduct);
});

app.get("/api/nintendo", async (req, res) => {
  const nintendoProducts = await getNintendoProducts();
  res.send(nintendoProducts);
});

app.get("/api/Playstation", async (req, res) => {
  
  const playstationProducts = await getPlaystationProducts();
  res.send(playstationProducts);
});

app.get("/api/Xbox", async (req, res) => {
  
  const xboxProducts = await getXboxProducts();
  res.send(xboxProducts);
});

app.get("/api/Deals", async (req, res) => {
  
  const dealProducts = await getDealProducts();
  res.send(dealProducts);
});


app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;
