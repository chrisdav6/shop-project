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
  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.redirect('/products');
}

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('admin/edit-product', {
      product: product,
      title: `Shop - Edit Product`,
      path: ''
    });
  });
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const { title, imageUrl, price, description } = req.body;
  const updatedProduct = new Product(prodId, title, imageUrl, price, description);
  updatedProduct.save();
  res.redirect('/admin/products');
}