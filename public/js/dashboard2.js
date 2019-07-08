


$(document).ready(function(){
    console.log("I am the dashboard javascript file, I have been fired")
    $.get("/api/user_data").then(function(data){
        console.log(data.user);
        $("#sidebarName").text(data);
    })
});



