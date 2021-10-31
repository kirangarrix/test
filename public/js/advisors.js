$(function () {
   
    //get access token 
    getAccessToken()
        .then(result =>{
            //get product list
            $.ajax({
                type: "GET",
                url: backendUrl+"/advisor",
                headers:{Authorization:"Bearer "+result},
                success: function (response) {
                  console.log(response);
                 let services = response.data.inventoryList;

                 $("#services").DataTable({
                    "data":services,
                    "columns":[
                        {title:"Name",data:"name"},
                        {title:"Price",data:"price"},
                        {title:"Products",data:"productsUsed"},
                        {render: function(data, type, full, meta){
                            
                          return `<button type="button" 
                                          class="btn btn-block btn-warning btn-flat"
                                          data-toggle="modal" 
                                          data-target="#myModal"
                                          onclick="navigateEditService('${full._id}','${full.name}','${full.price}','${full.productsUsed}')">Edit</button>`;
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
                  }).buttons().container().appendTo('#services_wrapper .col-md-6:eq(0)');
                
                
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

function navigateEditService(_productId,_productName,_productPrice,_productUsed){

//   localStorage.setItem("productId",_productId);
//   localStorage.setItem("productName",_productName);
//   localStorage.setItem("productPrice",_productPrice)
//   localStorage.setItem("productUsed",_productUsed);
   
  window.location.href ="/edit-service";
              
}

