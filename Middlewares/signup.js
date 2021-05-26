const { User } = require("../models/user.model");
const signup = async (req, res) => {
  try {
    const user = req.body;
    const NewUser = User(user);
    const savedProduct = await NewUser.save();
    res.json({
      success: true,
      icon: savedProduct.firstname[0],
      id: savedProduct._id,
    });
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