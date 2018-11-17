$(document).on('click', '#submitbutton', function(){
   var user = document.getElementById("username").value;
   sessionStorage.user = user;
   window.location = "https://www.waytowave.com/cobweb/Feed";

});
