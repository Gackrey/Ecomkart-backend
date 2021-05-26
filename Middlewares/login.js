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
        res.json({ success: true, icon: docs.firstname[0], id: docs._id });
      }
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Unable to find user",
        errorMessage: err.message,
      });
  }
};

module.exports = { login };