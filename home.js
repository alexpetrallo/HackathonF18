$( document ).ready(function() {
  //getPosts();
  console.log(sessionStorage.user);
  if (sessionStorage.user) {
    //load feed here
    //getPosts();
    showPosition(navigator.geolocation.getCurrentPosition(showPosition));
  } else {
    window.location = "https://www.waytowave.com/cobweb/";
  }
});
$(document).on('click', '#postButton', function() {
  var postVal = document.getElementById("captionText").value;
  var user = sessionStorage.user;
  getIPAddress();
  console.log(postVal + " " + user + " " + " " + longii + " " + latii)
  var formData = new FormData();
  formData.append('username', user);
  formData.append('content', postVal);
  formData.append('long', longii);
  formData.append('lat', latii);
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
});
var ip_address;
var getIPAddress = function() {
  $.getJSON("https://jsonip.com?callback=?", function(data) {
    ip_address = data.ip;
  });
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
function post_post() {


}
