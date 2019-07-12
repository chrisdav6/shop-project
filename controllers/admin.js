const Product = require('../models/products');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      products: products,
      title: 'Shop - Admin Products',
      path: '/admin/products'
    });
  });
}

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    title: 'Shop - Add Product',
    path: '/admin/add-product'
  });
}

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect('/products');
}