const express = require('express');
const razorpayRoute = require('./routes/razorPay.router')
const cors = require('cors');
const productRoute = require('./routes/product.router')
const userRoute = require('./routes/user.router')
const productData = require('./models/product-data')
const { Product } = require('./models/product.model')
const app = express();
app.use(express.json());
app.use(cors());

async function SaveData(){
  productData.map( async product => {
  try {
      const NewProduct = Product(product);
      const savedProduct = await NewProduct.save()
      console.log("Saved",savedProduct)
    }
    catch (err) {
      console.error(err)
    }
  })
}
const { initialzeDBConnection } = require('./db/db')
// SaveData()
initialzeDBConnection();
const PORT = process.env.PORT || 5000;
app.get('/', (request, response) => {
  response.json({ hello: "world" })
});

app.use('/products',productRoute)
app.use('/user',userRoute)
app.use('/razorpay',razorpayRoute)
/**
 * 404 Route Handler
 * Note: DO not MOVE. This should be the last route
 */
app.use((req, res) => {
  res.status(404).json({ success: false, message: "route not found on server, please check" })
})

/**
 * Error Handler
 * Don't move
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "error occured, see the errMessage key for more details", errorMessage: err.message })
})

app.listen(PORT, () => {
  console.log('Server Started at port', PORT);
})

