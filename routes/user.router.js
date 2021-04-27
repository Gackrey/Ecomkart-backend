const express = require('express')
const router = express.Router();
const { User } = require('../models/user.model')
const { extend } = require("lodash");

router.route('/signup')
  .post(async (req, res) => {
    try {
      const user = req.body;
      const NewUser = User(user);
      const savedProduct = await NewUser.save()
      res.json({ success: true, icon: savedProduct.firstname[0], id: savedProduct._id })
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ success: false, message: "Unable to add users", errorMessage: err.message })
    }
  })

router.route('/login')
  .get((req, res) => {
    res.send('Login')
  })
  .post((req, res) => {
    const user = req.body;
    try {
      User.findOne(user, function (err, docs) {
        if (docs === null) {
          res.status(500).json({ success: false, message: "Unable to find user" })
        }
        else {
          res.json({ success: true, icon: docs.firstname[0], id: docs._id })
        }
      })
    }
    catch (err) {
      res.status(500).json({ success: false, message: "Unable to find user", errorMessage: err.message })
    }
  })


router.param('userID', async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user)
      return res.status(400).json({ success: false, message: "product not found" })

    req.user = user;
    next()
  }
  catch (err) {
    res.status(400).json({ success: false, message: "could not retrieve product " })
  }
})

router.route("/:userID")
  .get((req, res) => {
    const { user } = req
    user.__v = undefined;
    res.json({ success: true, user })
  })
  .post(async (req, res) => {
    let { user } = req;
    const userUpdate = req.body;
    user = extend(user, userUpdate)
    user.updated = Date.now();

    const NewUser = User(user);
    const savedProduct = await NewUser.save()
    res.json({ success: true, savedProduct })
  })


module.exports = router