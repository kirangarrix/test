function getAccessToken(){
    
    let refreshToken = localStorage.getItem("refreshToken");
    return new Promise(function(resolve,reject){ 
          $.ajax({
              type: "POST",
              url:backendUrl+"/token/new-token",
              data:{refreshToken:refreshToken},
              success: function (response) {
                resolve(response.data.accessToken)
              },
              error:function (error){
                 reject(error)
              },
          });
    })
}
