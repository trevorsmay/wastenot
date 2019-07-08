
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
  })



$("#register").on("click", function (e) {
 
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


// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");

};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};



// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

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

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(['address_component']);
  // autocomplete2.setFields(['address_component']);

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
  // autocomplete2.addListener('place_changed', fillInAddress)
}

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

