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

//edit product
router.get('/edit-product', function(req, res) {
  res.render('product-add-edit',{name:"Product",functionality:"Edit product",key:"edit-product"});
});

//company
router.get('/companies', function(req, res) {
  res.render('companies',{});
});
//add company
router.get("/add-company",function(req,res){
   res.render('company-add-edit',{name:"Company",functionality:"Add company",key:"add-company"});
})

// edit compnay
router.get("/edit-company",function(req,res){
   res.render('company-add-edit',{name:"Company",functionality:"Add company",key:"edit-company"});
})

//services
router.get('/services', function(req, res) {
  res.render('services',{});
});

//add service
router.get("/add-service",function(req,res){
  res.render('service-add-edit',{name:"Service",functionality:"Add Service",key:"add-service"});
});

// edit service
router.get("/edit-service",function(req,res){
  res.render('service-add-edit',{name:"Service",functionality:"Edit Service",key:"edit-service"});
});


//stocks
router.get('/stocks', function(req, res) {
  res.render('stocks',{});
});

//add stock
router.get("/add-stock",function(req,res){
  res.render('stock-add-edit',{name:"Stock",functionality:"Add Stock",key:"add-stock"});
})

//advisors
router.get('/advisors', function(req, res) {
  res.render('advisors',{});
});

//add advisors
router.get("/add-advisors",function(req,res){
  res.render('advisor-add-edit',{name:"Advisor",functionality:"Add Advisor",key:"add-advisor"});
})

//edit advisors
router.get("/edit-advisors",function(req,res){
  res.render('advisor-add-edit',{name:"Advisor",functionality:"Add Advisor",key:"edit-advisor"});
})

//advisors
router.get('/bay', function(req, res) {
  res.render('bay',{});
});

// add bay

router.get("/add-bay",function(req,res){
  res.render('bay-add-edit',{name:"Bay",functionality:"Add Bay",key:"add-bay"});
});
// edit  bay
router.get("/edit-bay",function(req,res){
  res.render('bay-add-edit',{name:"Bay",functionality:"Edit Bay",key:"edit-bay"});
});




module.exports = router;
