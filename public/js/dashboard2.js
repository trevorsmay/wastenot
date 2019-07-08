


$(document).ready(function(){
    console.log("I am the dashboard javascript file, I have been fired")
    $.get("/api/user_data").then(function(data){
        console.log(data.user);
        $("#sidebarName").text();
    })

    $.get("/api/getAllUsers").then(function(data){
        console.log(data);
        console.log(data[data.length -1])
        var user  = data[data.length -1];
        $("#sidebarName").text(user.firstName +" "+ user.lastName)
        $(".user-name").text("Hello " + user.firstName + "!");
        $(".contactInfo").text(`Contact Info: ${user.email}`)
        $(".mailingAddress").text(`Mailing Address:  ${user.location}`)

    })
    

});



