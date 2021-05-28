const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/user.model");
const signup = async (req, res) => {
  try {
    const user = req.body;
    const NewUser = User(user);
    const savedProduct = await NewUser.save();
    const token = jwt.sign({ id: savedProduct._id },process.env.ACCESS_TOKEN_SECRET)
    res.json({ success: true, icon: savedProduct.firstname[0], id: token })
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Unable to add users",
        errorMessage: err.message,
      });
  }
};

module.exports = { signup };