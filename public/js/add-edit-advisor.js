$(function(){
    
    $("#add-advisor-form").submit(function(e) {
        e.preventDefault();
    })
    
      $.validator.setDefaults({
        submitHandler: function (e) {
          var Name = $("#name").val();
          var Email = $("#email").val();
          var Phone = $("#phone").val();
          var Date=$("#reservationdate").val();
    
          submitForm(Name,Email,Phone,Date);
         
        }
      });

      $('#add-advisor-form').validate({
        rules: {
          name: {
            required: true,
          },
          email: {
            required: true,
          },
          phone: {
            required: true,
          }
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
})