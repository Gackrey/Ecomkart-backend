const express = require("express");
const router = express.Router();
const { getUserDetails, getUserbyId } = require("../Middlewares/getUserbyId");
const { login } = require("../Middlewares/login");
const { signup } = require("../Middlewares/signup");
const { addWishlist, deleteWishlist,wishToCart } = require("../Middlewares/wishlist");
const { addCart, deleteCart,deleteAllFromCart, incCart, decCart, cartToWish,} = require("../Middlewares/cart");
const { addAddress, deleteAddress, updateAddress,} = require("../Middlewares/address");

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/userDetails").get(getUserbyId, getUserDetails);

router
  .route("/wishlist")
  .post(getUserbyId, addWishlist)
  .delete(getUserbyId, deleteWishlist);

router.route("/wish-to-cart").post(getUserbyId, wishToCart);

router
  .route("/cart")
  .post(getUserbyId, addCart)
  .delete(getUserbyId, deleteCart);

router.route("/payment-successful").delete(getUserbyId, deleteAllFromCart);
router.route("/inc-cart").post(getUserbyId, incCart);
router.route("/dec-cart").post(getUserbyId, decCart);
router.route("/cart-to-wish").post(getUserbyId, cartToWish);

router
  .route("/address")
  .post(getUserbyId, addAddress)
  .delete(getUserbyId, deleteAddress);

router.route("/updateAddress").post(getUserbyId, updateAddress);

module.exports = router;
