$( document ).ready(function() {
  if (sessionStorage.user) {
    //load feed here
  } else {
    window.location = "https://www.waytowave.com/cobweb/";
  }
});
var ip_address;
var getIPAddress = function() {
  $.getJSON("https://jsonip.com?callback=?", function(data) {
    ip_address = data.ip;
  });
};
function strike_ip() {
  $.ajax({
      url: "/backend.php?method=strike_ip", // Url to which the request is send
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
