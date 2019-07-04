// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  registerUser: function(user_data) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/register",
      data: JSON.stringify(user_data)
    });
  },
  postJob: function(job){
    return $.ajax({
      headers: {
        "content-type": "application/json"
      },
      type: "POST",
      url: "/api/addJob"
    })
  },
  getAllUserData: function() {
    return $.ajax({
      url: "/api/getAllUsers",
      type: "GET"
    });
  },
  getAllJobs: function(){
    return $.ajax({
      url:"/api/getAllJobs",
      type: "GET"
    });
  },
  deleteUser: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  deleteJob: function(id){
    return $.ajax({
      url: "/api/deleteJob/" + id,
      type: "DELETE"
    })
  },
  updateUser: function(req, id){
    return $.ajax({
      url: "/api/updateUserInfo/" +id,
      type:"UPDATE",
      data: JSON.stringify(req)
    })
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var postJobs = function() {
  API.getAllJobs().then(function(data) {
    var $jobs = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($jobs);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

postJobs();

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
