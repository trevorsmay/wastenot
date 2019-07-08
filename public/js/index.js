// Get references to page elements
// var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var place;
var firstName, lastName;

// The API object contains methods for each kind of request we'll make
var API = {
  registerUser: function (user_data) {
    return $.ajax({
      headers:{
        "object": "application/json"
      },
      type: "POST",
      url: "/api/signup",
      
    });
  },
  postJob: function (job) {
    return $.ajax({
      headers: {
        "content-type": "application/json"
      },
      type: "POST",
      url: "/api/addJob",
      data: JSON.stringify(job)
    })
  },
  getAllUserData: function () {
    return $.ajax({
      url: "/api/getAllUsers",
      type: "GET"
    });
  },
  getAllJobs: function () {
    return $.ajax({
      url: "/api/getAllJobs",
      type: "GET"
    });
  },
  deleteUser: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  deleteJob: function (id) {
    return $.ajax({
      url: "/api/deleteJob/" + id,
      type: "DELETE"
    })
  },
  updateUser: function (req, id) {
    return $.ajax({
      url: "/api/updateUserInfo/" + id,
      type: "UPDATE",
      data: JSON.stringify(req)
    })
  },
  updateJob: function (req, id){
    return $.ajax({
      url: "/api/updateJob/" + id,
      type: "UPDATE",
      data: JSON.stringify(req)
    })
  }
};




var newUser;
$("#register").on("click", function (e) {
 e.preventDefault();
console.log("something")

  var firstName = $("#firstName").val();
  var lastName = $("#lastName").val();
  var companyName = ("Jims");
  var phoneNumber = $("#phoneNumber").val();
  var email = $("#email").val();
  var password = $("#password").val();
  var location = $("#autocomplete").val();
  var photo = "blank";
  var timesDonated = 0;
  var timesVolunteered = 0;
  var moneyEarned = 0;
  var itemsSold = 0;
  var newUser =[ {
    firstName,
    lastName,
    companyName,
    phoneNumber,
    email,
    password,
    location,
    photo,
    timesDonated,
    timesVolunteered,
    moneyEarned,
    itemsSold,
    
  }];
  
  
//  API.registerUser(newUser[0]).then(function(user){
//     console.log(user+ "the registerUSer call ");
//     window.location.pathname="/dashboard"
//  })

  $.post("/api/signup", newUser[0], function() {
   window.location.pathname = "/dashboard";
    
})

});



var refreshExamples = function(){
  console.log("refresh Examples");
}

// $("#sign-in").on("click", function(e){

//   e.preventDefault();
//   var emailInput =  $("#email");
//   var passwordInput =  $("#password");

//   var userData = {
//     email: emailInput.val().trim(),
//     password: passwordInput.val().trim()
//   }
//   console.log("I work");

//   if (!userData.email|| !userData.password){
//     return;
//   }
 
//   loginUser(userData.email, userData.password);
//   emailInput.val("");
//   passwordInput.val("");

// })

function loginUser(email, password) {
  console.log(email, password);
  $.post("/api/login", {
    email: email,
    password: password
  })
    .then(function() {
      console.log("I was hit");
      window.location.replace("/dashboard");
      // If there's an error, log the error
    })
    .catch(function(err) {
      console.log(err);
    });
}



// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);


var placeSearch, autocomplete;

// var autocomplete2

var componentForm = {

  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};


function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  console.log("InitAutoComplete")
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'), {
      types: ['geocode']
    });
  var place = autocomplete.getPlace();

  // autocomplete2 = new google.maps.places.Autocomplete(
  //     document.getElementById('registrationAutoComplete'), {types: ['geocode']});


  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(['address_component']);
  // autocomplete2.setFields(['address_component']);


  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
  // autocomplete2.addListener('place_changed', fillInAddress)
}



function fillInAddress() {
  // Get the place details from the autocomplete object.
  console.log("fillInAddress()")
  var place = autocomplete.getPlace();
  // var place2 = autocomplete2.getPlace();


  // for (var component in componentForm) {
  //   document.getElementById(component).value = '';
  //   document.getElementById(component).disabled = false;
  // }

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  // for (var i = 0; i < place.address_components.length; i++) {
  //   var addressType = place.address_components[i].types[0];
  //   if (componentForm[addressType]) {
  //     var val = place.address_components[i][componentForm[addressType]];
  //     document.getElementById(addressType).value = val;
  //   }
  // }

}



// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate(event) {


  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function (position, ) {

      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log(position.coords.accuracy);
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());


    });
  }
}

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
      donateQuantity: $(".food-quantity").val().trim(),
      foodExpire: $(".food-exp").val().trim(),
      pickupLocation: $(".food-location").val().trim(),
      pickupTime: $(".pick-up-time").val().trim()
      // foodComments: $(".food-comments").val().trim()
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
  quantity.html("Food Quantity: " + donateData[0].donateQuantity);
  modalDiv.append(quantity);

  var br3 = $("<br>");
  modalDiv.append(br3);

  var expiration = $("<h3>");
  expiration.html("Food Expiration: " + donateData[0].foodExpire);
  modalDiv.append(expiration);

  var br4 = $("<br>");
  modalDiv.append(br4);

  var location = $("<h3>");
  location.html("Food Location: " + donateData[0].pickupLocation);
  modalDiv.append(location);

  var br5 = $("<br>");
  modalDiv.append(br5);

  var time = $("<h3>");
  time.html("Pick Up Time: " + donateData[0].pickupTime);
  modalDiv.append(time);

  var br6 = $("<br>");
  modalDiv.append(br6);

  var comments = $("<h3>");
  comments.html("Food Comments: " + donateData[0].foodComments);
  modalDiv.append(comments);

  var br7 = $("<br>");
  modalDiv.append(br7);

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
// everything coming in on the form.


function storeDonation(donateData) {
  donateData = JSON.stringify(donateData[0]);
  API.postJob(donateData).then(function(data){
    console.log(data);
  })

  $(".grab-donate").addClass("hide-content");
  $(".donation-confirmation").removeClass("hide-content");

  
}


