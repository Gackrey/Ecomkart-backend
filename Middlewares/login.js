const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/user.model");
const login = async (req, res) => {
  const user = req.body;
  try {
    await User.findOne(user, function (err, docs) {
      if (docs === null) {
        res
          .status(500)
          .json({ success: false, message: "Unable to find user" });
      } else {
        const token = jwt.sign(
          { id: docs._id },
          process.env.ACCESS_TOKEN_SECRET
        );
        res.json({ success: true, icon: docs.firstname[0], id: token });
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to find user",
      errorMessage: err.message,
    });
  }
};

module.exports = { login };
