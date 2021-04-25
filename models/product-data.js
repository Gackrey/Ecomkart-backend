const faker = require("faker");
const Productdata = require('../JSON/data.json')

faker.seed(1024);
const products = [...Productdata].map(({title,image,category}) => ({
  name: title,  
  image: image,
  price: faker.commerce.price(),
  inStock: faker.random.arrayElement([true, true, false]),
  fastDelivery: faker.datatype.boolean(),
  ratings: faker.random.arrayElement([3.1,3.3,3.6,3.8,4,4.1,4.3,4.5,4.8,5]),
  category: category,
  quantity: 1,
  isinCart: false,
  isWishlisted: false
}));

module.exports = products;