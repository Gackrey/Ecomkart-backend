const { extend } = require("lodash");
const addCart = async (req, res) => {
  let { user } = req;
  const cartItem = req.body;
  user.cart.push(cartItem);
  await user.save();
  res.json({ success: true });
};

const deleteCart = async (req, res) => {
  let { user } = req;
  const cart_id = req.body._id;
  const updatedCart = user.cart.filter((item) => item._id !== cart_id);
  user = extend(user, { cart: updatedCart });
  await user.save();
  res.json({ success: true });
};

module.exports = { addCart, deleteCart };