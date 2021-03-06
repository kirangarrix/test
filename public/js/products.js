$(function () {
   
    //get access token 
    getAccessToken()
        .then(result =>{
            //get product list
            $.ajax({
                type: "GET",
                url: backendUrl+"/product",
                headers:{Authorization:"Bearer "+result},
                success: function (response) {
                
                 let products = response.data.products;

                 $("#example1").DataTable({
                    "data":products,
                    "columns":[
                        {title:"Name",data:"name"},
                        {title:"Measured Unit",data:"measuredUnit"},
                        {title:"Opening Quantity",data:"openingQuantity"},
                        {title:"Available Quantity",data:"availableQuantity"},
                        {title:"Price/Unit",data:"pricePerUnit"},
                        {title:"Created Date",data:"createdAt",render:function (data) {
                            var date = new Date(data);
                            var month = date.getMonth() + 1;
                            return (month.toString().length > 1 ? month : "0" + month) + "/" + date.getDate() + "/" + date.getFullYear();
                        }},
                        {title:"Description",data:"description"},
                        {render: function(data, type, full, meta){
                            
                          return `<button type="button" 
                                          class="btn btn-block btn-warning btn-flat"
                                          data-toggle="modal" 
                                          data-target="#myModal"
                                          onclick="navigateEditProduct('${full._id}','${full.name}','${full.measuredUnit}',
                                            '${full.openingQuantity}','${full.availableQuantity}',
                                             '${full.description+""}',${full.pricePerUnit})">Edit</button>`;
                         },data:null,title:"Edit"},
                        {render: function(data, type, full, meta){
                            
                          
                            return `<button class="btn btn-block btn-danger btn-flat" 
                                            onclick="deleteProduct('${full._id}')">Delete</button>`;
                         },data:null,title:"Delete"},
                    ],
                    "responsive": true,
                     "lengthChange": false, 
                     "autoWidth": false,
                    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                  }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
                
                
                },
                error:function (error){
                console.log(error)
                },
            });
        })
        .catch(error =>{
                console.log(error)
        })
   
    
   

  });


function deleteProduct(_productId){
  var proceed = confirm("Do you want to delete this product?");
    if (proceed) {
      
    let productId  = _productId;
      //get access token 
      getAccessToken()
        .then(result =>{
        //get product list
         $.ajax({
            type: "DELETE",
            url:backendUrl+"/product/"+productId,
            headers:{Authorization:"Bearer "+result},
            success: function (response) {
            
              
              window.location.reload();
            
            
            },
            error:function (error){
              alert(error.responseJSON.message+"")
            },
        });
    })
    .catch(error =>{
        console.log(error)
    })
    }
}

function navigateEditProduct(_productId,_productName,_measuredUnit,_openingQuantity,_availableQuantity,_description,_pricePerUnit){

  localStorage.setItem("productId",_productId);
  localStorage.setItem("productName",_productName);
  localStorage.setItem("measuredUnit",_measuredUnit);
  localStorage.setItem("openingQuantity",_openingQuantity);
  localStorage.setItem("pricePerUnit",_pricePerUnit);
  localStorage.setItem("description",_description);
   
  window.location.href ="/edit-product";
              
}

