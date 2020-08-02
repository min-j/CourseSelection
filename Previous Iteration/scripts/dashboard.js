var dropdownInstance;
document.addEventListener('DOMContentLoaded', function() {

    var dropdown = document.querySelectorAll('.dropdown-trigger');
    var instance = M.Dropdown.init(dropdown, {
      coverTrigger: false,
    });

});

//firebase
const auth = firebase.auth();
const db = firebase.database();

auth.onAuthStateChanged(user =>{
  if(user) {
    console.log("user logged in ", user);
  }else{
    console.log("no user logged in");
    //redirect to login page
    window.location.replace("login.html");
  }
});

//Logout
const logoutBtn=document.querySelector('#logout-btn');
logoutBtn.addEventListener('click', (e) => {

  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("user signed out");
  }).catch(function(error) {
      // An error happened.
  });

});
