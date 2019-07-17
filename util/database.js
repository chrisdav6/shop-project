const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/myShop';

const mongoConnect = (callback) => {
  MongoClient.connect(url, { useNewUrlParser: true }).then(client => {
    console.log('Connected to Database');
    callback(client);
  }).catch(err => {
    console.log(err);
  });
};

module.exports = mongoConnect;