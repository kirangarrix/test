$(function(){

  if(key == "edit-stock"){
    var productId = localStorage.getItem("productId");
    var productName = localStorage.getItem("productName");
    var measuredUnit = localStorage.getItem("measuredUnit");
    var openingQuantity = localStorage.getItem("openingQuantity");
    var availableQuantity = localStorage.getItem("availableQuantity");
    var description = localStorage.getItem("description");
    var pricePerUnit = localStorage.getItem("pricePerUnit");
 
    
     $("#name").val(productName);
     $("#measuredUnit").val();
     $(`#measuredUnit option[value="${measuredUnit}"]`).attr("selected",true);
     $("#pricePerUnit").val(pricePerUnit);
     $("#openingQuantity").val(openingQuantity);
     $("#productDescription").val(description);
   }
   

  $.validator.setDefaults({
    submitHandler: function () {

      var ProductsId = $("#Products option:selected").attr("id");
      var StockStatus = $("#stockStatus").val();
      var Quantity = $("#Quantity").val();


      submitForm(ProductsId,StockStatus,Quantity);
     
    }
  });

  $('#add-stock-form').validate({
    rules: {
      Products: {
        required: true,
      },
      stockStatus: {
        required: true,
      },
      Quantity: {
        required: true,
      },
    },
    messages: {
      Products: {
        required: "Please select product",
      },
      stockStatus:{
        required: "Please select product",
      },
      Quantity:{
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

  function submitForm(_ProductsId,_StockStatus,_Quantity){
        
    $("#submit-btn").css("display","none");
    $("#submit-spinner").css("display","inline");
     // call api
  
   getAccessToken()
       .then(result =>{
         //get product list
         if (key == "add-stock"){
            $.ajax({
                type: "POST",
                url:backendUrl+"/inventory",
                data:{
                    productId:_ProductsId,
                    stockStatus:_StockStatus,
                    noOfUnits:_Quantity,
                   },
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

          if(key == "edit-stock"){
            //console.log(productId,productName,measuredUnit,openingQuantity,availableQuantity,description,pricePerUnit)
            $.ajax({
                type: "PUT",
                url:backendUrl+`/inventory/?startDate=${_startDate}&endDate=${endDate}`,
                data:{
                  product:_Products,
                    stockStatus:_StockStatus,
                    quantity:_Quantity,
                   },
                headers:{Authorization:"Bearer "+result},
                success: function (response) {
                    $("#submit-btn").css("display","inline");
                    $("#submit-spinner").css("display","none");
                    alert("product edited");
                    window.location.href ="/products"
                
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

})