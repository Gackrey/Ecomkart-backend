const { User } = require("../models/user.model");
const getUserbyId = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "user not found" });

    req.user = user;
    next();
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "could not retrieve user " });
  }
};

const getUserDetails = (req, res) => {
  const { user } = req;
  user.__v = undefined;
  res.json({ success: true, user });
};

module.exports = { getUserbyId, getUserDetails };
