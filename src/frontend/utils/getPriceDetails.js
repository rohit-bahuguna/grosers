function getPriceDetails(myCart) {
  return myCart.reduce(
    ({ price, discount }, item) => {
      price += item.price * item.quantity;
      discount += (item.originalPrice - item.price) * item.qty;
      return { price, discount };
    },
    {
      price: 0,
      discount: 0,
    }
  );
}

export { getPriceDetails };
