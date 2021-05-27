const { extend } = require("lodash");
const addWishlist = async (req, res) => {
  let { user } = req;
  const wishlistItem = req.body;
  user.wishlist.push(wishlistItem);
  const updatedCart = user.cart.map((item) =>
    item._id === wishlistItem._id ? { ...item, isWishlisted: true } : item
  );
  user = extend(user, { cart: updatedCart });
  await user.save();
  res.json({ success: true });
};

const deleteWishlist = async (req, res) => {
  let { user } = req;
  const wishlist_id = req.body._id;
  const updatedWishlist = user.wishlist.filter(
    (item) => item._id !== wishlist_id
  );
  const updatedCart = user.cart.map((item) =>
    item._id === wishlist_id ? { ...item, isWishlisted: false } : item
  );
  user = extend(user, { wishlist: updatedWishlist }, { cart: updatedCart });
  await user.save();
  res.json({ success: true });
};

const wishToCart = async (req, res) => {
  let { user } = req;
  const wishlist_id = req.body._id;
  const cartItem = req.body;
  const updatedWishlist = user.wishlist.filter(
    (item) => item._id !== wishlist_id
  );
  user.cart.push(cartItem);
  user = extend(user, { wishlist: updatedWishlist });
  await user.save();
  res.json({ success: true });
};

module.exports = { addWishlist, deleteWishlist, wishToCart };
