$(function(){
    //validation 
    $.validator.setDefaults({
      submitHandler: function () {
        var email = $("#email").val();
        var password =$("#password").val();

        submitForm(email,password);
      }
    });



    $('#login-form').validate({
      rules: {
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 5
        },
        terms: {
          required: true
        },
      },
      messages: {
        email: {
          required: "Please enter a email address",
          email: "Please enter a valid email address"
        },
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long"
        },
        terms: "Please accept our terms"
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
    
  })


  function submitForm(_email,_password){

      $("#btn-login").css("display","none");
      $("#spinner-login").css("display","inline-block");
      $.ajax({
              type: "POST",
              url:"http://localhost:5000/api/user/login",
              data:{email:_email,password:_password},
              success: function (response) {
                $("#btn-login").css("display","inline-block");
                $("#spinner-login").css("display","none");
                //navigate to home screen 
                let id = response.data.id
                let name = response.data.name
                let refreshToken = response.data.refreshToken
                let userType = response.data.userType
                
                localStorage.setItem("id",id)
                localStorage.setItem("name",name)
                localStorage.setItem("refreshToken",refreshToken)
                localStorage.setItem("userType",userType)
                window.location.href ="/"; 
              },
              error:function (error) {

                $("#btn-login").css("display","inline-block");
                $("#spinner-login").css("display","none");
                let response = error.responseJSON;
                $("#server-error-box").show();
                $("#server-error").text(response.message);
              },
              
          });
    
  }