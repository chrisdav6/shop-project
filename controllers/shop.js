const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        products: products,
        title: 'Shop - Home',
        path: '/'
      });
    }).catch(err => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        products: products,
        title: 'Shop - Products',
        path: '/products'
      });
    }).catch(err => {
      console.log(err);
    });
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-details', {
        product: product,
        title: `Shop - Product`,
        path: '/products'
      });
    }).catch(err => {
      console.log(err);
    });;
}

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        title: 'Shop - Cart',
        path: '/cart',
        products: products
      });
    }).catch(err => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    }).catch(err => {
      console.log(err);
    });
};

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId, product => {
//     Cart.deleteProduct(prodId, product.price);
//   });
//   res.redirect('/cart');
// };

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     title: 'Shop - Checkout',
//     path: '/checkout'
//   });
// };

// exports.getOrders = (req, res, next) => {
//   res.render('shop/orders', {
//     title: 'Shop - Orders',
//     path: '/orders'
//   });
// };