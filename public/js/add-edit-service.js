$(function () {
  if(key == "edit-service"){
    var productId = localStorage.getItem("productId");
    var productName = localStorage.getItem("productName");
    var productPrice=localStorage.getItem("productPrice")
    var productUsed = localStorage.getItem("productUsed");
   
    
     $("#name").val(productName);
     $("#pricePerUnit").val(productPrice);
     $("#Products").val(productUsed);
   }

  //product selector on button click
  $("#add-product").click(function () { 

    //get access token
    getAccessToken().then((result) => {
      // get product
      $.ajax({
        type: "GET",
        url: backendUrl+"/product",
        headers: { Authorization: "Bearer " + result },
        success: function (response) {
            // console.log(response);
          let products = response.data.products;
          for (var i = 0; i < products.length; i++) {
            $(".products").append(
              $(`<option id=${products[i]._id} quantity=${products[i].openingQuantity}>${products[i].name}</option>`)
            );
          }
        },
      });
    });
    

     var  element =`<div class="row">
                <div class="col-6">
                    <div class="form-group">
                    <label for="exampleInputPassword1">Product</label>
                    <select class="form-control products" style="width: 100%;" name="products"  id="Products">
                    <option value="" selected disabled>Choose</option>   
                    </select>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                    <label for="exampleInputEmail1">Quantity</label>
                    <input type="number" name="quantity" class="form-control quantity"  id="quantity" placeholder="Enter Quantity">
                    </div>
                </div>
             </div>`
      $("#extra-products").append(element);
  });


  $.validator.setDefaults({
    submitHandler: function (e) {
      var name = $("#name").val();
      var pricePerUnit = $("#pricePerUnit").val();
      var Product = $("#Products").val();
      var openingQuantity = $("#openingQuantity").val();
      //  var Products=$(".products").val();
      //  var Quantity=$(".quantity").val();
      
      

      submitForm(name,pricePerUnit,Product,openingQuantity);
     
    }
  });

  $('#add-service-form').validate({
    rules: {
      name: {
        required: true,
      },
      pricePerUnit: {
        required: true,
      },
      Products: {
        required: true,
      },
      openingQuantity: {
        required: true,
      },

    },
    messages: {
      name: {
        required: "Please provide a product name",
      },
      pricePerUnit: {
        required: "Please provide price per unit",
      },
      Products: {
        required: "Please select product",
      },
      openingQuantity:{
        required:"Please provide quantity"
      },
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    }
  });

  function submitForm(_name,_pricePerUnit,_product,_openingQuantity){
        
    $("#submit-btn").css("display","none");
    $("#submit-spinner").css("display","inline");
     // call api
  
   getAccessToken()
       .then(result =>{
         //get product list
         if (key == "add-service"){
            $.ajax({
                type: "POST",
                url:backendUrl+"/service",
                data:{
                    name:_name,
                    pricePerUnit:_pricePerUnit,
                    product:_product,
                    openingQuantity:_openingQuantity},
                headers:{Authorization:"Bearer "+result},
                success: function (response) {
                  console.log(response);
                    $("#submit-btn").css("display","inline");
                    $("#submit-spinner").css("display","none");
                    alert("new product added");
                
                
                },
                error:function (error){
                    let response = error.responseJSON;
                    $("#submit-btn").css("display","inline");
                    $("#submit-spinner").css("display","none");   
                    alert(response.message);
                },
            });

          }

          if(key == "edit-service"){
            //console.log(productId,productName,measuredUnit,openingQuantity,availableQuantity,description,pricePerUnit)
            $.ajax({
                type: "PUT",
                url:backendUrl+"/service",
                data:{
                    name:_name,
                    pricePerUnit:_pricePerUnit,
                    product:_product,
                    openingQuantity:_openingQuantity},
                headers:{Authorization:"Bearer "+result},
                success: function (response) {
                    $("#submit-btn").css("display","inline");
                    $("#submit-spinner").css("display","none");
                    alert("product edited");
                    window.location.href ="/services"
                
                },
                error:function (error){
                    let response = error.responseJSON;
                    $("#submit-btn").css("display","inline");
                    $("#submit-spinner").css("display","none");   
                    alert(response.message);
                },
            });
          }
      })
      .catch(error =>{
              console.log(error)
              $("#submit-btn").css("display","inline");
              $("#submit-spinner").css("display","none");
      })

    
}
  
    
});