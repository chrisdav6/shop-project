const Product = require('../models/products');

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      products: products,
      title: 'Shop - Home',
      path: '/'
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      products: products,
      title: 'Shop - Products',
      path: '/products'
    });
  });
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    title: 'Shop - Cart',
    path: '/cart'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    title: 'Shop - Checkout',
    path: '/checkout'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    title: 'Shop - Orders',
    path: '/orders'
  });
};