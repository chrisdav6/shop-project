const mongoose = require('mongoose');
const Product = require('./models/product');
const mockData = require('./mockData.json');

async function seedDb() {
  await Product.deleteMany({});
  Product.insertMany(mockData)
    .then(() => {
      console.log('Data Added to DB');
    }).catch(err => {
      console.log(err);
    });
};

module.exports = seedDb;