const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
const errorController = require('./controllers/error');
const User = require('./models/user');

//Seed DB
// const seedDb = require('./seedDb');
// seedDb();

//BodyParser
app.use(express.urlencoded({ extended: true }));

//Static Folders
app.use(express.static(path.join(__dirname, 'public')));

//Use EJS Templating Engine
app.set('view engine', 'ejs');

//Routes
app.use('/', shopRoutes);
app.use('/admin', adminRoutes);

//Serve 404 page
app.use(errorController.get404Page);

//Use default User
app.use((req, res, next) => {
  User.findById('5d2f4863c3511c4a985d40ef')
    .then(user => {
      req.user = user;
      next();
    }).catch(err => {
      console.log(err);
    });
});

//Connect to DB
const dbLocalUrl = 'mongodb://localhost:27017/myShop';
const dbMlabUrl = 'mongodb://chris:chris1234@ds251877.mlab.com:51877/myshop'

mongoose.connect(dbMlabUrl, { useNewUrlParser: true })
  .then(result => {
    console.log('Connected to DB');

    //Create Default User
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Chris',
          email: 'chris@mail.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });

    //Start Server
    app.listen(port, () => {
      console.log(`Server started on port number ${port}`);
    });
  }).catch(err => {
    console.log(err);
  });
