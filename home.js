$( document ).ready(function() {
  //getPosts();
  delete_past();
  console.log(sessionStorage.user);
  if (sessionStorage.user) {
    //load feed here
    //getPosts();

    getIPAddress();
    checkBanned();
    showPosition(navigator.geolocation.getCurrentPosition(showPosition));
  } else {
    window.location = "https://www.waytowave.com/cobweb/";
  }
});
function checkBanned(){
    console.log("checkingbanned");
    var user = sessionStorage.user;
    var formData = new FormData();
    formData.append('ip', ip_address);
    $.ajax({
        url: "/cobweb/backend.php?method=strike_count", // Url to which the request is send
        type: "POST",
        data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(data){
          console.log("succ" + data);
            if(data == "banned") {
              banned = true;
              checkBannedD();
            }
        },
        error: function(data) {
             console.log(data);
          },
      });

}

var banned = false;
function checkBannedD(){
  if(banned){
    alert("you are banned");
    document.getElementById("body").innerHTML = "<div style='text-align: center'><h1> you are banned. </h1><h3> go away </h3></div>";
  }
}
function delete_past(){
  $.ajax({
      url: "/cobweb/backend.php?method=delete_past", // Url to which the request is send
      type: "POST",             // Type of request to be send, called as method
      data :{},
      contentType: false,       // The content type used when sending data to the server.
      cache: false,             // To unable request pages to be cached
      processData:false,        // To send DOMDocument or non processed data file it is set to false
    });
}
$(document).on('click', '#report', function() {
  var post_id = $(this).data("id");
  console.log(post_id + " this dont wokr or do it");
  var formData = new FormData();
  formData.append('post_id', post_id);
  $.ajax({
      url: "/cobweb/backend.php?method=strike_ip", // Url to which the request is send
      type: "POST",             // Type of request to be send, called as method
      data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
      contentType: false,       // The content type used when sending data to the server.
      cache: false,             // To unable request pages to be cached
      processData:false,        // To send DOMDocument or non processed data file it is set to false
      success: function(data){
        //increase val by one temporarily?
        console.log(data);
      },
      error: function(data){ console.log("fail" + data);},
    });
});
$(document).on('click', '#postButton', function() {
  var postVal = document.getElementById("captionText").value;
  if(postVal) {

    var user = sessionStorage.user;
    getIPAddress();
    console.log(postVal + " " + user + " " + " " + longii + " " + latii)
    var formData = new FormData();
    formData.append('username', user);
    formData.append('content', postVal);
    formData.append('long', longii);
    formData.append('lat', latii);
    formData.append('ip', ip_address);

    $.ajax({
        url: "/cobweb/backend.php?method=post_post&long="+longii+"&lat="+latii, // Url to which the request is send
        type: "POST",
        data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(data){
          console.log("succ" + data);
          showPosition(navigator.geolocation.getCurrentPosition(showPosition));

        },
        error: function(data) {
             console.log(data);
          },
      });
      $("#captionText").val('');
        console.log("butts " + $("#captionText").value);
    }
});
$(document).on('click', '#upvote', function() {
  var post_id = $(this).data("id");
  console.log(post_id + " this dont wokr or do it");
  var formData = new FormData();
  formData.append('post_id', post_id);
  formData.append('ip_address', ip_address);
  $.ajax({
      url: "/cobweb/backend.php?method=upvote", // Url to which the request is send
      type: "POST",             // Type of request to be send, called as method
      data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
      contentType: false,       // The content type used when sending data to the server.
      cache: false,             // To unable request pages to be cached
      processData:false,        // To send DOMDocument or non processed data file it is set to false
      success: function(data){
        //increase val by one temporarily?
        console.log(data);


        console.log(document.getElementById("voteCount").innerHTML);
      },
      error: function(data){ console.log("fail" + data);},
    });
    $(this).toggleClass("btn-outline-success");
    document.getElementById("voteCount").innerHTML = "+1!";
    $(this).toggleClass("btn-success");
    $(this).addClass('disabled');

});
$(document).on('click', '#downvote', function() {
  var post_id = $(this).data("id");
  console.log(post_id + " this dont wokr or do it");
  var formData = new FormData();
  formData.append('post_id', post_id);
  formData.append('ip_address', ip_address);
  $.ajax({
      url: "/cobweb/backend.php?method=downvote", // Url to which the request is send
      type: "POST",             // Type of request to be send, called as method
      data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
      contentType: false,       // The content type used when sending data to the server.
      cache: false,             // To unable request pages to be cached
      processData:false,        // To send DOMDocument or non processed data file it is set to false
      success: function(data){
        //increase val by one temporarily?
        console.log(data);

      },
      error: function(data){ console.log("fail" + data);},
    });
    $(this).toggleClass("btn-outline-danger");
    document.getElementById("voteCount").innerHTML = "-1";
    $(this).toggleClass("btn-danger");
    $(this).addClass('disabled');
});
var ip_address;
var getIPAddress = function() {
  if(!sessionStorage.ip) {
    $.getJSON("https://jsonip.com?callback=?", function(data) {
      ip_address = data.ip;
      sessionStorage.ip = ip_address;
    });
  } else {
    ip_address = sessionStorage.ip;
  }
};
var latii, longii;
function showPosition(position) {
  latii = position.coords.latitude;
  longii = position.coords.longitude ;
  console.log(latii + ", " + longii);
  $.ajax({
      url: "/cobweb/backend.php?method=getposts&long="+longii+"&lat="+latii, // Url to which the request is send
      type: "POST",             // Type of request to be send, called as method
      data :{longi:longii, lati: latii},
      contentType: false,       // The content type used when sending data to the server.
      cache: false,             // To unable request pages to be cached
      processData:false,        // To send DOMDocument or non processed data file it is set to false
      success: function(data){
        console.log("succ" + data);
        $('#cardss').html(data);
      },
      error: function(data){ console.log("fail" + data);},
    });
}

function strike_ip() {
  $.ajax({
      url: "/cobweb/backend.php?method=strike_ip", // Url to which the request is send
      type: "POST",             // Type of request to be send, called as method
      data :{ip:ip_address},
      contentType: false,       // The content type used when sending data to the server.
      cache: false,             // To unable request pages to be cached
      processData:false,        // To send DOMDocument or non processed data file it is set to false
      success: function(data)   // A function to be called if request succeeds
      {
        console.log(data);
      }
    });
}
