$(function () {
   
    //get access token 
    getAccessToken()
        .then(result =>{
            //get product list
            $.ajax({
                type: "GET",
                url: backendUrl+"/company",
                headers:{Authorization:"Bearer "+result},
                success: function (response) {
                  console.log(response);
                  let companies = response.data.companies;

                 $("#companies").DataTable({
                    "data":companies,
                    "columns":[
                        { title: "Name", data: "name" },
                        { title: "Email", data: "emailAddress" },
                        { title: "Phone", data: "phone" },
                        { title: "Credit Limit", data: "creditLimit" },
                        { title: "Address", data: "address" },
                        {render: function(data, type, full, meta){
                            
                          return `<button type="button" 
                                          class="btn btn-block btn-warning btn-flat"
                                          data-toggle="modal" 
                                          data-target="#myModal"
                                          onclick="navigateEditService('${full._id}','${full.name}','${full.productsUsed}')">Edit</button>`;
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
                  }).buttons().container().appendTo('#companies_wrapper .col-md-6:eq(0)');
                
                
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

