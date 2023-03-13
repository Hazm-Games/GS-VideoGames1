function Cart({ userId }) {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    async function fetchCart() {
      const cart = await getCartByUserId({ userId });
      setCart(cart);
    }
    fetchCart();
  }, [userId]);

  if (!cart) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.products.map((product) => (
          <li key={product.id}>
            {product.name} - Quantity: {product.quantity}
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => handlePurchase(cart.id)}>Purchase</button>
    </div>
  );

  async function handleDelete(productId) {
    await deleteCartProduct(productId);
    const updatedCart = await getCartByUserId({ userId });
    setCart(updatedCart);
  }

  async function handlePurchase(cartId) {
    await purchaseCart({ cartId, userId });
    const newCart = await createCart(userId);
    setCart(newCart);
  }
}

export default Cart;
