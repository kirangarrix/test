var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//login route
router.get('/login', function(req, res, next) {
    
    res.render('login',{});
});

//products route
router.get('/products', function(req, res, next) {
  res.render('product',{});
});

//product add
router.get('/add-product', function(req, res, next) {
  res.render('product-add-edit',{name:"Product",functionality:"Add product",key:"add-product"});
});

router.get('/edit-product', function(req, res, next) {
  res.render('product-add-edit',{name:"Product",functionality:"Edit product",key:"edit-product"});
});


module.exports = router;
