const mongoose = require('mongoose');
require('mongoose-type-url')
const Schema = mongoose.Schema;
const userSchema = new Schema({
  id: Schema.Types.ObjectId,
  firstname: {
    type: String,
    required: [true, "name is required"]
  },
  lastname: {
    type: String,
    required: [true, "name is required"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
    validate: {
      validator: function(v) {
        return /[a-z][0-9]*@gmail.com/.test(v)
      },
      message: props => `${props.value} is not a valid email`
    }
  },

  password: {
    type: String,
    require: [true, "password field is required"],
    validate: {
      validator: function(v) {
        return v.length >= 6 && /\d+/.test(v)
      },
      message: props => `password must be 6 characters long and must contain a number`
    }
  },

  cart: {
    type: Array,
  },
  wishlist: {
    type: Array,
  },
  addresses: {
    type: Array
  }
}, { timestamps: true })

const User = mongoose.model("Userdata", userSchema);
module.exports = { User }