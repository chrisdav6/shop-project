const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
const errorController = require('./controllers/error');

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

//Connect to DB
const dbUrl = 'mongodb://localhost:27017/myShop';
mongoose.connect(dbUrl, { useNewUrlParser: true })
  .then(result => {
    console.log('Connected to DB');
    //Start Server
    app.listen(port, () => {
      console.log(`Server started on port number ${port}`);
    });
  }).catch(err => {
    console.log(err);
  });
