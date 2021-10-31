$(function () {
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
            $("#Products").append(
              $(`<option id=${products[i]._id} quantity=${products[i].openingQuantity}>${products[i].name}</option>`)
            );
          }
        },
      });
    });
  });
  