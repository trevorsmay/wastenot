/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

//Populate Donate content function 
$("#donate-btn").on("click", function() {
  $(".grab-landing").addClass("hide-content");
  $(".grab-donate").removeClass("hide-content");
  $(".donation-confirmation").addClass("hide-content");
});

//Grab Donation values on donate form submit
$("#form-donate-submit").on("click", function(e) {
  e.preventDefault();

  var donateData = [
    {
      foodType: $(".food-type").val().trim(),
      foodQuantity: $(".food-quantity").val().trim(),
      foodExpiration: $(".food-exp").val().trim(),
      foodLocation: $(".food-location").val().trim(),
      foodComments: $(".food-comments").val().trim()
    }
  ];

  modalRender(donateData);
});

//Render Modal For final submission function
function modalRender(donateData) {

  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";

  var modalDiv = $("<div>");
  var modalTitle = $("<h1>");
  modalTitle.html("Are You Sure You Want To Submit This Donation?");
  modalDiv.append(modalTitle);

  var br1 = $("<br>");
  modalDiv.append(br1);

  var type = $("<h3>");
  type.html("Food Type: " + donateData[0].foodType);
  modalDiv.append(type);

  var br2 = $("<br>");
  modalDiv.append(br2);

  var quantity = $("<h3>");
  quantity.html("Food Quantity: " + donateData[0].foodQuantity);
  modalDiv.append(quantity);

  var br3 = $("<br>");
  modalDiv.append(br3);

  var expiration = $("<h3>");
  expiration.html("Food Expiration: " + donateData[0].foodExpiration);
  modalDiv.append(expiration);

  var br4 = $("<br>");
  modalDiv.append(br4);

  var location = $("<h3>");
  location.html("Food Location: " + donateData[0].foodLocation);
  modalDiv.append(location);

  var br5 = $("<br>");
  modalDiv.append(br5);

  var comments = $("<h3>");
  comments.html("Food Comments: " + donateData[0].foodComments);
  modalDiv.append(comments);

  var br6 = $("<br>");
  modalDiv.append(br6);

  var submit = $("<button>");
  submit.addClass("btn btn-success");
  submit.attr("type", "submit");
  submit.attr("id", "store-donation");
  submit.text("Submit");
  modalDiv.append(submit);

  $(".modal-text").html(modalDiv);

  span.onclick = function() {
    modal.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  $("#store-donation").on("click", function(e) {
    e.preventDefault();
    
    storeDonation(donateData);

    modal.style.display = "none";

    $(".food-type").val("");
    $(".food-quantity").val("");
    $(".food-exp").val("");
    $(".food-location").val("");
    $(".food-comments").val("");
  });
}

function storeDonation(donateData) {
  console.log(donateData);

  $(".grab-donate").addClass("hide-content");
  $(".donation-confirmation").removeClass("hide-content");

  
}