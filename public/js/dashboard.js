/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

//this function retrieves the user information
function getUserStats() {
    $.get("/api/findjobs", function(data) {
        generateStats(data);
    })
}

function getUserJobs() {
    $.get("/api/getJobsWhere", function(data) {
        yourJobs(data);
    })
}

getUserJobs();

getUserStats();

//this function populates the html with the stored information
function generateStats(data) {
    for (var i = 0; i < data.length; i++) {
        var jobObject = data[i];

        var tr = $("<tr>");

        var jobId = $("<td>");
        jobId.html(jobObject.id);
        jobId.attr("id", "donation-id");
        jobId.attr("value", jobObject.id);
        tr.append(jobId);

        var date = $("<td>");
        date.html(jobObject.foodExpire);
        tr.append(date);

        var food = $("<td>");
        food.html(jobObject.foodType);
        tr.append(food);

        var quantity = $("<td>");
        quantity.html(jobObject.donateQuantity);
        tr.append(quantity);

        var location = $("<td>");
        location.html(jobObject.pickupLocation);
        tr.append(location);

        var but = $("<button>");
        but.addClass("btn btn-success pt-2");
        but.attr("type", "submit");
        but.addClass("your-donation");
        but.text("Choose");
        tr.append(but);

        $(".donations-table").append(tr);

    }
}

//Populate Donate content function 
$("#donate-btn").on("click", function() {
    $(".grab-landing").addClass("hide-content");
    $(".grab-donate").removeClass("hide-content");
    $(".grab-volunteer").addClass("hide-content");
    $(".donation-confirmation").addClass("hide-content");
    $(".deletion-confirmation").addClass("hide-content");
    $(".select-confirmation").addClass("hide-content");
    $(".complete-confirmation").addClass("hide-content");
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
        pickupTime: $(".pick-up-time").val().trim(),
        foodComments: $(".food-comments").val().trim(),
        status: false,
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
  
  function storeDonation(donateData) {
    console.log(donateData);
  
    $(".grab-donate").addClass("hide-content");
    $(".donation-confirmation").removeClass("hide-content");

    $.post("/api/donate", donateData[0], function() {
        console.log("Test1");
    })
  }

  // on click that retrieves db jobs and then 
  $("#volunteer-btn").on("click", function(e) {
        e.preventDefault();
        $(".grab-donate").addClass("hide-content");
        $(".grab-landing").addClass("hide-content");
        $(".grab-volunteer").removeClass("hide-content");
        $(".deletion-confirmation").addClass("hide-content");
        $(".select-confirmation").addClass("hide-content");
        $(".complete-confirmation").addClass("hide-content");

        $.get("/api/findJobsWhere", function(data) {
            generateJobs(data);
        })

  });

  function generateJobs(data) {
    for (var i = 0; i < data.length; i++) {
        var jobObject = data[i];
        
        var tr = $("<tr>");

        var jobId = $("<td>");
        jobId.html(jobObject.id);
        jobId.attr("id", "job-id");
        jobId.attr("value", jobObject.id);
        tr.append(jobId);

        var date = $("<td>");
        date.html(jobObject.foodExpire);
        tr.append(date);

        var food = $("<td>");
        food.html(jobObject.foodType);
        tr.append(food);

        var time = $("<td>");
        time.html(jobObject.pickupTime);
        tr.append(time);

        var location = $("<td>");
        location.html(jobObject.pickupLocation);
        tr.append(location);

        var but = $("<button>");
        but.addClass("btn btn-success pt-2");
        but.attr("type", "submit");
        but.attr("id", "open-job");
        but.text("Choose");
        tr.append(but);

        $(".jobs-table").append(tr);
        }
  }

  function yourJobs(data) {
    for (var i = 0; i < data.length; i++) {
        var jobObject = data[i];
    
        
        var tr = $("<tr>");

        var jobId = $("<td>");
        jobId.html(jobObject.id);
        jobId.attr("id", "my-job-id");
        jobId.attr("value", jobObject.id);
        tr.append(jobId);

        var date = $("<td>");
        date.html(jobObject.foodExpire);
        tr.append(date);

        var food = $("<td>");
        food.html(jobObject.foodType);
        tr.append(food);

        var time = $("<td>");
        time.html(jobObject.pickupTime);
        tr.append(time);

        var location = $("<td>");
        location.html(jobObject.pickupLocation);
        tr.append(location);

        var but = $("<button>");
        but.addClass("btn btn-success pt-2");
        but.attr("type", "submit");
        but.addClass("your-job");
        but.text("Complete");
        tr.append(but);

        $(".your-jobs").append(tr);
    }
  }

  $(document).on("click", ".your-donation", function() {
    
    var modal = document.getElementById("myModal2");
    var span = document.getElementsByClassName("close2")[0];
  
    modal.style.display = "block";
    
    var modalDiv = $("<div>");
    var title = $("<h1>");
    title.text("Are You Sure You Want To Delete This Donation?");
    modalDiv.append(title);

    var br1 = $("<br>");
    modalDiv.append(br1);

    var button = $("<button>");
    button.text("Yes");
    button.attr("type", "button");
    button.attr("id", "destroy-column");
    button.addClass("btn btn-success");
    modalDiv.append(button);

    $(".modal-text2").html(modalDiv);

    span.onclick = function() {
        modal.style.display = "none";
      }
      
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
  });

//on click for your job destroy
$(document).on("click", "#destroy-column", function(e) {
    e.preventDefault();

    var modal = document.getElementById("myModal2");
    modal.style.display = "none";

    var id = $("#donation-id").attr("value");

    deleteRow(id);
    $(".grab-landing").addClass("hide-content");
    $(".deletion-confirmation").removeClass("hide-content");

});

//function that deletes donations
function deleteRow(id) {
    console.log(id);
    $.ajax({
        method: "DELETE",
        url: "/api/complete/" + id
      }).then(function(data) {
          console.log(data);
      })
}

//functions for selecting a job
$(document).on("click", "#open-job", function(e) {
    e.preventDefault();
    console.log("open");

    var id = $("#job-id").attr("value");

    console.log(id);

    selectJob(id);
    $(".select-confirmation").removeClass("hide-content");
    $(".grab-volunteer").addClass("hide-content");
});

function selectJob(id) {
  var bool = {true: true};
  $.ajax({
    method: "PUT",
    url: "/api/select/" + id,
    data: bool
  })
    .then(function(response) {
      console.log(response);
    });
}

$(document).on("click", ".your-job", function() {
  var id = $("#my-job-id").attr("value");
  console.log(id);

  completeJob(id);
  $(".grab-landing").addClass("hide-content");
  $(".complete-confirmation").removeClass("hide-content");

})

function completeJob(id) {
  var bool = {true: 3};
  $.ajax({
    method: "PUT",
    url: "/api/select/" + id,
    data: bool
  })
    .then(function(response) {
      console.log(response);
    });
}