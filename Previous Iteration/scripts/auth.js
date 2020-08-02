// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

});

//auth and db
const auth = firebase.auth();
const db = firebase.database();
const rootRef = db.ref();
const userRef = rootRef.child('users');
const studentRef = userRef.child('students');

auth.onAuthStateChanged(user =>{
  if(user) {
    console.log("user logged in ", user);
    //redirect to dashboard
    //window.location.replace("dashboard.html");
  }else{
    console.log("no user logged in");
  }
});


//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //get signup info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  const osis = signupForm['signup-osis'].value;

  studentRef.orderByChild("OSIS").equalTo(osis).once('value',function(snapshot){

    if(snapshot.val() != null){
      snapshot.forEach(function(child){
        var key = child.key;
        studentRef.child(key+'/userToken').once('value', function(snapshot){
          if(snapshot.val() != ""){
            //user is already registered b/c usertoken field is full

            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupForm.reset();

            alert("This osis has already been registered with");
          }else{
            //since usertoken is empty, user can sign up
            //sign up the user and add add new token to db
            auth.createUserWithEmailAndPassword(email, password).then(cred => {
              //get userid from credentials
              userId = auth.currentUser.uid;
              //update the userToken in db
              studentRef.child(key).update
            });
          };
        });
      });
    }else{
      //alert if value is null
      alert("Either the OSIS is incorrect or you don't belong here");
    };

  });


});
/*
//sign up with email and password_______________________________________
auth.createUserWithEmailAndPassword(email, password).then(cred =>{
  //console.log(cred.user);
  //get userId of the newly signed up user
  userId = auth.currentUser.uid;
  //update userToken info
  db.ref(parent).update({userToken : userId});
  console.log("user registered");

  const modal = document.querySelector('#modal-signup');
  M.Modal.getInstance(modal).close();
  signupForm.reset();

  //user is signed in, sign them out
  auth.signOut().then(()=>{
    console.log("user has signed out");
  });
*/


//login
const loginForm=document.querySelector('#login-form');
loginForm.addEventListener('submit',  (e) => {
  e.preventDefault();

  //get user login info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user)
    window.location.replace("dashboard.html");
    //reset the form
    loginForm.reset();
  });


});
