$(function () {
   
    //get access token 
    getAccessToken()
        .then(result =>{
            //get product list
            $.ajax({
                type: "GET",
                url: backendUrl+"/bay",
                headers:{Authorization:"Bearer "+result},
                success: function (response) {
                  console.log(response);
                  let baylist = response.data.bayList;

                 $("#bay").DataTable({
                    "data":baylist,
                    "columns":[
                        { title: "Name", data: "bayName" },
                        {title:"Points",data:"points"}
                       ,
                        {render: function(data, type, full, meta){
                            
                          return `<button type="button" 
                                          class="btn btn-block btn-warning btn-flat"
                                          data-toggle="modal" 
                                          data-target="#myModal"
                                          onclick="navigateEditBay('${full._id}','${full.bayName}')">Edit</button>`;
                         },data:null,title:"Edit"},
                        {render: function(data, type, full, meta){
                            
                          
                            return `<button class="btn btn-block btn-danger btn-flat" 
                                            onclick="deleteBay('${full._id}')">Delete</button>`;
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


function deleteBay(_bayId){
  var proceed = confirm("Do you want to delete this product?");
    if (proceed) {
      
    let bayId  = _bayId;
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

function navigateEditBay(_bayId,_bayName){

  localStorage.setItem("bayId",_bayId);
  localStorage.setItem("bayName",_bayName);
   
  window.location.href ="/edit-bay";
              
}

