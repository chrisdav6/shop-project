const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database');

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

//Start Server & Database
mongoConnect((client) => {
  console.log(client);
  app.listen(port, () => {
    console.log(`Server started on port number ${port}`);
  });
});
