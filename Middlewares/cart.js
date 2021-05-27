const { extend } = require("lodash");
const addCart = async (req, res) => {
  let { user } = req;
  const cartItem = req.body;
  user.cart.push(cartItem);
  const updatedWishlist = user.wishlist.map((item) =>
    item._id === cartItem._id ? { ...item, isinCart: true } : item
  );
  user = extend(user, { wishlist: updatedWishlist });
  await user.save();
  res.json({ success: true });
};

const deleteCart = async (req, res) => {
  let { user } = req;
  const cart_id = req.body._id;
  const updatedCart = user.cart.filter((item) => item._id !== cart_id);
  const updatedWishlist = user.wishlist.map((item) =>
    item._id === cart_id ? { ...item, isinCart: false } : item
  );
  user = extend(user, { cart: updatedCart }, { wishlist: updatedWishlist });
  await user.save();
  res.json({ success: true });
};

const cartToWish = async (req, res) => {
  let { user } = req;
  const wishlistItem = req.body;
  const cart_id = req.body._id;
  const updatedCart = user.cart.filter((item) => item._id !== cart_id);
  user.wishlist.push(wishlistItem);
  user = extend(user, { cart: updatedCart });
  await user.save();
  res.json({ success: true });
};
const incCart = async (req, res) => {
  let { user } = req;
  const cartItem = req.body;
  const updatedCart = user.cart.map((item) =>
    item._id === cartItem._id ? { ...item, quantity: item.quantity + 1 } : item
  );
  user = extend(user, { cart: updatedCart });
  await user.save();
  res.json({ success: true });
};

const decCart = async (req, res) => {
  let { user } = req;
  const cartItem = req.body;
  if (cartItem.quantity > 1) {
    const updatedCart = user.cart.map((item) =>
      item._id === cartItem._id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    user = extend(user, { cart: updatedCart });
    await user.save();
  } else {
    const cart_id = req.body._id;
    const updatedCart = user.cart.filter((item) => item._id !== cart_id);
    user = extend(user, { cart: updatedCart });
    await user.save();
  }
  res.json({ success: true });
};

module.exports = { addCart, deleteCart, cartToWish, incCart, decCart };
