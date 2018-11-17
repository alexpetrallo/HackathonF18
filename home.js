$( document ).ready(function() {
  if (sessionStorage.user && sessionStorage.user_id) {
    //load feed here
  } else {
    window.location = "https://www.waytowave.com/cobweb/home";
  }
});
