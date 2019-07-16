const Product = require('../models/products');
const Cart = require('../models/cart');

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

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-details', {
      product: product,
      title: `Shop - Product`,
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

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
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