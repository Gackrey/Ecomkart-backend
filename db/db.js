const mongoose = require('mongoose')

function initialzeDBConnection() {
  mongoose.connect("mongodb+srv://gackrey:bokakhat555@neog-cluster.ffik4.mongodb.net/Ecomkart?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch(error=> console.log("Connection failed...",error))
}

module.exports = { initialzeDBConnection }