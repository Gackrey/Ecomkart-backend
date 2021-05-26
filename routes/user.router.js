const express = require("express");
const router = express.Router();
const { addCart, deleteCart } = require("../Middlewares/cart");
const { getUserDetails, getUserbyId } = require("../Middlewares/getUserbyId");
const { login } = require("../Middlewares/login");
const { signup } = require("../Middlewares/signup");
const { addWishlist, deleteWishlist } = require("../Middlewares/wishlist");
const {
  addAddress,
  deleteAddress,
  updateAddress,
} = require("../Middlewares/address");

router.route("/signup").post(signup);

router.route("/login").post(login);

router.param("userID", getUserbyId);

router.route("/:userID").get(getUserDetails);

router.route("/:userID/wishlist").post(addWishlist).delete(deleteWishlist);

router.route("/:userID/cart").post(addCart).delete(deleteCart);

router.route("/:userID/address").post(addAddress).delete(deleteAddress);

router.route("/:userID/updateAddress").post(updateAddress);

module.exports = router;
