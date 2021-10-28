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
router.get('/products', function(req, res) {
  res.render('product',{});
});

//product add
router.get('/add-product', function(req, res) {
  res.render('product-add-edit',{name:"Product",functionality:"Add product",key:"add-product"});
});

router.get('/edit-product', function(req, res) {
  res.render('product-add-edit',{name:"Product",functionality:"Edit product",key:"edit-product"});
});

router.get("/add-company",function(req,res){
   res.render('company-add-edit',{name:"Company",functionality:"Add company",key:"add-company"});
})


module.exports = router;
