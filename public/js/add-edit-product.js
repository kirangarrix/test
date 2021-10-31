$(function () {
  if(key == "edit-product"){
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
    submitHandler: function (e) {
    
      
      var name = $("#name").val();
      var measuredUnit = $("#measuredUnit").val();
      var pricePerUnit = $("#pricePerUnit").val();
      var openingQuantity = $("#openingQuantity").val();
      var productDescription = $("#productDescription").val();
  
      

      submitForm(name,measuredUnit,pricePerUnit,openingQuantity,productDescription);

    }
  });


  $('#add-product-form').validate({
    rules: {
      name: {
        required: true,
      },
      measuredUnit: {
        required: true,
      },
      pricePerUnit: {
        required: true,
      },
      openingQuantity: {
        required: true,
      },
      productDescription: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Please provide a product name",
      },
      measuredUnit:{
        required: "Please select measured unit"
      },
      pricePerUnit: {
        required: "Please provide price per unit",
      },
      openingQuantity: {
        required: "Please provide quantity",
      },
      productDescription:{
        required:"Please provide description"
      }
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
  
 function submitForm(_name,_measuredUnit,_pricePerUnit,_openingQuantity,_productDescription){
        
        $("#submit-btn").css("display","none");
        $("#submit-spinner").css("display","inline");
         // call api
      
       getAccessToken()
           .then(result =>{
             //get product list
             if (key == "add-product"){
                $.ajax({
                    type: "POST",
                    url:backendUrl+"/product",
                    data:{
                        name:_name,
                        measuredUnit:_measuredUnit,
                        pricePerUnit:_pricePerUnit,
                        openingQuantity:_openingQuantity,
                        description:_productDescription},
                    headers:{Authorization:"Bearer "+result},
                    success: function (response) {
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

              if(key == "edit-product"){
                //console.log(productId,productName,measuredUnit,openingQuantity,availableQuantity,description,pricePerUnit)
                $.ajax({
                    type: "PUT",
                    url:backendUrl+"/product/"+productId,
                    data:{
                        name:_name,
                        measuredUnit:_measuredUnit,
                        pricePerUnit:_pricePerUnit,
                        openingQuantity:_openingQuantity,
                        description:_productDescription},
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
  
});