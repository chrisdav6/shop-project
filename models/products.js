const fs = require('fs');
const path = require('path');

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.randon().toString();
    const filepath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
    fs.readFile(filepath, (err, fileContents) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContents);
      }
      products.push(this);
      fs.writeFile(filepath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    const filepath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
    fs.readFile(filepath, (err, fileContents) => {
      if (err) {
        return callback([]);
      }
      callback(JSON.parse(fileContents));
    });
  }
};