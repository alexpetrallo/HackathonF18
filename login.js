$(document).on('click', '#submitbutton', function(){
  console.log("click");
   var usernameValue = document.getElementById("userInput").value;
   sessionStorage.user = usernameValue;
   console.log(usernameValue);
   //window.location = "https://www.waytowave.com/cobweb/home";
   if (sessionStorage.user) {
     window.location = "https://www.waytowave.com/cobweb/home";
   }
});
