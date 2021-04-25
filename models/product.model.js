const mongoose = require('mongoose');
require('mongoose-type-url')
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  image: String,
  price: Number,
  inStock: Boolean,
  fastDelivery: Boolean,
  ratings:Number,
  category:String,
  quantity:Number,
  isinCart:Boolean,
  isWishlisted:Boolean
})

const Product = mongoose.model("products", ProductSchema);

module.exports = { Product }