$(function () {
  if(key == "edit-company"){
    var companyId = localStorage.getItem("copmanyId");
    var companyName = localStorage.getItem("companyName");
    var emailAddress = localStorage.getItem("emailAddress");
    var phone = localStorage.getItem("phone");
    var creditLimit = localStorage.getItem("creditLimit");
    var address = localStorage.getItem("address");
 
 
    
     $("#name").val(companyName);
     $("#email").val(emailAddress);
     $("#phone").val(phone);
     $("#creditLimit").val(creditLimit);
     $("#address").val(address);
   }
   
  $.validator.setDefaults({
    submitHandler: function (form,e) {
      e.preventDefault(e);
      
       var name = $("#name").val();
      var email = $("#email").val();
      var phone = $("#phone").val();
      var creditLimit = $("#creditLimit").val();
      var address = $("#address").val();
      submitForm(name,email,phone,creditLimit,address);

    }
  });
  

  
  jQuery.validator.addMethod("phoneIND", function (phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, "");
    return this.optional(element) || phone_number.length === 10 
   }, "Invalid phone number");

  $('#add-company-form').validate({
    rules: {
      name: {
        required: true,
      },
      email: {
        email:true,
        required: true,
      },
       phone: {
        required: true,
        phoneIND:true
      },
      creditLimit: {
        required: true,
        maxlength:6
      },
      address: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Please provide a  name"
      },
      email: {
        required: "Please provide an email id ",
        email:"Not a valid email id "
      },
      phone: {
        required: "Please provide phone number",
        phoneIND:"Not a valid phone number",
      },
      creditLimit: {
        required:"Please provide a credit limit",
        maxlength:"Limit exceeded"
      },
      address: {
        required: "Please provide address",
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
  
 function submitForm(_name,_email,_phone,_creditLimit,_address){

        $("#submit-btn").css("display","none");
        $("#submit-spinner").css("display","inline");
         // call api

       getAccessToken()
           .then(result =>{
             //get product list
             if (key == "add-company"){
                $.ajax({
                    type: "POST",
                    url:backendUrl+"/company",
                    data:{
                      name:_name,
                      email:_email,
                      phone:_phone,
                      address:_address,
                      creditLimit:_creditLimit},
                    headers:{Authorization:"Bearer "+result},
                    success: function (response) {
                        $("#submit-btn").css("display","inline");
                        $("#submit-spinner").css("display","none");
                        alert("new company added");
                        $('#add-company-form').trigger("reset");
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

