$(function () {
  //product selector on button click
  $("#add-product").click(function (e) { 
      e.preventDefault();

     var  element =`<div class="row">
                <div class="col-8">
                    <div class="form-group">
                    <label for="exampleInputPassword1">Product</label>
                    <select class="form-control" style="width: 100%;" id="measuredUnit">
                        <option value="">Product 1</option>
                        <option value="">Product 2</option>
                    </select>
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                    <label for="exampleInputEmail1">Quantity</label>
                    <input type="number" name="openingQuantity" class="form-control" id="openingQuantity" placeholder="Enter Quantity">
                    </div>
                </div>
             </div>`
      $("#extra-products").append(element);
  });
  
    
});