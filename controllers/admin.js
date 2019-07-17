const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('admin/products', {
        products: products,
        title: 'Shop - Admin Products',
        path: '/admin/products'
      });
    }).catch(err => {
      console.log(err);
    });;
}

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    title: 'Shop - Add Product',
    path: '/admin/add-product'
  });
}

exports.postAddProduct = (req, res, next) => {
  const { title, price, imageUrl, description } = req.body;
  const product = new Product({ title, price, imageUrl, description });
  product.save()
    .then(result => {
      console.log('Product Created!');
      res.redirect('/admin/products');
    }).catch(err => {
      console.log(err);
    });
}

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('admin/edit-product', {
        product: product,
        title: `Shop - Edit Product`,
        path: ''
      });
    }).catch(err => {
      console.log(err);
    });
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const { title, imageUrl, price, description } = req.body;

  Product.findById(prodId)
    .then(product => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;
      return product.save();
    }).then(result => {
      console.log('Product Updated!');
      res.redirect('/admin/products');
    }).catch(err => {
      console.log(err)
    });
}

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.deleteById(prodId);
//   res.redirect('/admin/products');
// };