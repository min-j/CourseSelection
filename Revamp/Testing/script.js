//let may be reassigned
//const will not reassigned
//var is some weak shit
//function expression function(variable) { function }

var config = {
  apiKey: "AIzaSyB2quSIJ-ptFzaNkPvzCgbfOsnMLypfmy4",
  authDomain: "awesomeml-f5f43.firebaseapp.com",
  databaseURL: "https://awesomeml-f5f43.firebaseio.com",
  projectId: "awesomeml-f5f43",
  storageBucket: "awesomeml-f5f43.appspot.com",
  messagingSenderId: "431178309079"
};
firebase.initializeApp(config);

const dbRef = firebase.database().ref(); //changing child will change the child accordingly in the database
const rules = dbRef.child('rules').child('courses');
const students = dbRef.child('users').child('students');

//test
dbRef.on('value', function(snapshot) { //on means retrieving a value of the data from database and providing a snapshot, in this case this returns the whole database
  console.log("data");
});
//students.orderByChild('FIRST').equalTo('Camille').on('value', function(snapshot) { //order by child 'FIRST' will create a query of 'FIRST' keys and equalTo will search for Camille
//  console.log(snapshot.val());
//});
//students.child('0').on('value', function(snapshot) {
//  console.log(snapshot.val());
//});

var stdEmail;
var parent;
var stdRef;
var required;
var stdgrade;

function login() {
  //larzetoc@bxscience.edu
  stdEmail = document.getElementById('email').value;
  if (stdEmail == "") {
    alert("Please enter a valid email.");
  } else if (document.getElementById('password').value != "yeehaw") {
    alert("Password is empty or incorrect.")
  }
  else {
    students.orderByChild('email').equalTo(stdEmail).on('value', function(snapshot) { //obtaining the parent
      snapshot.forEach(function(child) {
        parent = child.key;
        console.log(parent);
      })
    });
    stdRef = students.child(parent);
    stdRef.child('FIRST').on('value', function(snapshot) {
      var name = JSON.stringify(snapshot.val());
      document.getElementById('welcome').innerHTML = "Welcome back, " + name.substring(1, name.length-1) + "!";
      document.getElementById('button').style.visibility = "visible";
    });
    // window.location.href = "dashboard.html"
  }
}

function takeCourse(course) {
  rules.child(course).on('value', function(snapshot) {
    required = JSON.stringify(snapshot.val()).replace(/[{}:""]/g, "");
    console.log(required);
  })
  var arr = required.split(/([0-9]+)/);
  console.log(arr[1]);

  stdRef.child(arr[0]).on('value', function(snapshot) {
    stdgrade = snapshot.val();
    console.log(stdgrade);
  });

  if (stdgrade >= arr[1]) {
    return true;
  } else {
    return false;
  }
}

function check() {
  document.getElementById('result').innerHTML = takeCourse('AP Computer Science A');
}
