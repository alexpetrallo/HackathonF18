$(document).on('click', '#loginbutton', function(){
   var user = document.getElementById("username").value;
   sessionStorage.user = user;
   window.location = "TBD";

});
