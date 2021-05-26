const express = require("express");
const router = express.Router();
const { getUserDetails, getUserbyId } = require("../Middlewares/getUserbyId");
const { login } = require("../Middlewares/login");
const { signup } = require("../Middlewares/signup");
const { addWishlist, deleteWishlist,wishToCart } = require("../Middlewares/wishlist");
const { addCart, deleteCart, incCart, decCart, cartToWish,} = require("../Middlewares/cart");
const { addAddress, deleteAddress, updateAddress,} = require("../Middlewares/address");

router.route("/signup").post(signup);

router.route("/login").post(login);

router.param("userID", getUserbyId);

router.route("/:userID").get(getUserDetails);

router.route("/:userID/wishlist").post(addWishlist).delete(deleteWishlist);
router.route("/:userID/wish-to-cart").post(wishToCart);

router.route("/:userID/cart").post(addCart).delete(deleteCart);
router.route("/:userID/inc-cart").post(incCart);
router.route("/:userID/dec-cart").post(decCart);
router.route("/:userID/cart-to-wish").post(cartToWish);

router.route("/:userID/address").post(addAddress).delete(deleteAddress);

router.route("/:userID/updateAddress").post(updateAddress);

module.exports = router;
