const { extend } = require("lodash");
const addWishlist = async (req, res) => {
  let { user } = req;
  const wishlistItem = req.body;
  user.wishlist.push(wishlistItem);
  await user.save();
  res.json({ success: true });
};

const deleteWishlist = async (req, res) => {
  let { user } = req;
  const wishlist_id = req.body._id;
  const updatedWishlist = user.wishlist.filter(
    (item) => item._id !== wishlist_id
  );
  user = extend(user, { wishlist: updatedWishlist });
  await user.save();
  res.json({ success: true });
};

module.exports = { addWishlist, deleteWishlist };
