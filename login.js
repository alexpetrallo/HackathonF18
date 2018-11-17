$(document).on('click', '#submitbutton', function(){
   var usernameValue = document.getElementById("userInput").value;
   sessionStorage.user = usernameValue;
   console.log(usernameValue);
   window.location = "https://www.waytowave.com/cobweb/home";

});
