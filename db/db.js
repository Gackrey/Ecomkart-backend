const mongoose = require('mongoose')
require("dotenv").config();
function initialzeDBConnection() {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch(error=> console.log("Connection failed...",error))
}

module.exports = { initialzeDBConnection }