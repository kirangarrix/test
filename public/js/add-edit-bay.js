$(function () {
    if(key == "edit-bay"){
      var bayId = localStorage.getItem("bayId");
      var bayName = localStorage.getItem("bayName");
     
   
   
      
       $("#name").val(bayName);
     
     }
     
    $.validator.setDefaults({
      submitHandler: function () {
       
        
         var name = $("#name").val();
        submitForm(name);
  
      }
    });
    
  
    

  
    $('#add-company-form').validate({
      rules: {
        name: {
          required: true,
        },
      },
      messages: {
        name: {
          required: "Please provide a  name"
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
    
   function submitForm(_name){
  
          $("#submit-btn").css("display","none");
          $("#submit-spinner").css("display","inline");
           // call api
  
         getAccessToken()
             .then(result =>{
               //get product list
               if (key == "add-bay"){
                  $.ajax({
                      type: "POST",
                      url:backendUrl+"/bay",
                      data:{
                        name:_name,
                       },
                      headers:{Authorization:"Bearer "+result},
                      success: function (response) {
                          $("#submit-btn").css("display","inline");
                          $("#submit-spinner").css("display","none");
                          alert("new bay added");
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
  
                if(key == "edit-bay"){
                  //console.log(productId,productName,measuredUnit,openingQuantity,availableQuantity,description,pricePerUnit)
                  $.ajax({
                      type: "PUT",
                      url:backendUrl+"/bay/"+bayId,
                      data:{
                          name:_name,
                    },
                      headers:{Authorization:"Bearer "+result},
                      success: function (response) {
                          $("#submit-btn").css("display","inline");
                          $("#submit-spinner").css("display","none");
                          alert("bay edited");
                          window.location.href ="/bay"
                      
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
  
  