$( document ).ready(function() {
  showPosition(navigator.geolocation.getCurrentPosition(showPosition));
  //getPosts();
  if (sessionStorage.user) {
    //load feed here
    //getPosts();
  } else {
    window.location = "https://www.waytowave.com/cobweb/";
  }
});
$(document).on('click', '#postButton', function() {
  var postVal = document.getElementById("captionText").value;
  var user = sessionStorage.user;
  getIPAddress();
  console.log(postVal + " " + user + " " + " " + longii + " " + latii)
  $.ajax({
      url: "/cobweb/backend.php?method=post_post&long="+longii+"&lat="+latii, // Url to which the request is send
      type: "POST",
      dataType:'json',          // Type of request to be send, called as method
      data :{content:postVal, username: user, long:longii, lat:latii},
      contentType: false,       // The content type used when sending data to the server.
      cache: false,             // To unable request pages to be cached
      processData:false,        // To send DOMDocument or non processed data file it is set to false
      success: function(data){
        console.log("succ" + data);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
           console.log(errorThrown + " " + textStatus);
           console.warn(xhr.responseText)
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
  longii = position.coords.longitude;
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
