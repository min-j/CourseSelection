var express = require('express');
var router = express.Router();

var { firebase } = require('../public/javascripts/config.js');
const auth = firebase.auth();
const students = firebase.database().ref().child('users').child('students');

/* GET home page. */
// BUGS: if logged in, redirect to dashboard
router.get('/', function(req, res, next) {
  if (global.parent != undefined) {
    res.redirect('/dashboard');
  }
  else {
    if (req.query.e == 'invalid') {
      message = "Sorry, either the OSIS was incorrect or you don't belong here. Try again.";
    }
    else if (req.query.e == 'success') {
      message = "Sign Up Successful";
    }
    else if (req.query.e == 'existing') {
      message = "That OSIS has already been registered with.";
    }
    else if (req.query.e == "confirm") {
      message = "Passwords do not match. Try again."
    }
    else if (req.query.e == "password") {
      message = "The password is invalid."
    }
    else if (req.query.e == "user") {
      message = "No user was found. Login or sign up."
    }
    else {
      message = "";
    }
    res.render('index', { message: message } );
  }
});

// sign up
router.post('/', function(req, res, next) {
  students.orderByChild("OSIS").equalTo(req.body['OSIS']).once('value', function(snapshot) {
    if (snapshot.val() != null) {
      snapshot.forEach(function(child) {
        var key = child.key;
        students.child(key).child('userToken').once('value', function(snapshot) {
          if (snapshot.val() != "") {
            res.redirect('/?e=existing')
          }
          else {
            if (req.body['password'] == req.body['confirmPassword']) {
              auth.createUserWithEmailAndPassword(req.body['email'], req.body['password']).then(cred => {
                userId = auth.currentUser.uid;
                students.child(key).update( { userToken: userId } );
                res.redirect('/?e=success')
              })
            }
            else {
              res.redirect('/?e=confirm')
            }
          }
        })
      })
    }
    else {
      res.redirect('/?e=invalid')
    }
  })
})

module.exports = router;
