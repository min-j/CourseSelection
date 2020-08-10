var express = require('express');
var router = express.Router();

var { firebase } = require('../public/javascripts/config.js')
const auth = firebase.auth();
const students = firebase.database().ref().child('users').child('students');

var parent;
var loggedIn = false;

router.get('/', function(req, res, next) {
  if (loggedIn) {
    res.render('dashboard');
  }
  else {
    res.redirect('/?e=user');
  }
});

router.post('/', function(req, res, next) {
  var success = true;
  auth.signInWithEmailAndPassword(req.body['email'], req.body['password']).catch(function(error) {
    console.log(error);
    if (error.code == 'auth/wrong-password') {
      res.redirect('/?e=password');
      success = false;
    }
    if (error.code == 'auth/user-not-found') {
      res.redirect('/?e=user')
      success = false;
    }
  })
  var authFlag = true;
  auth.onAuthStateChanged(function(user) {
    if (user && authFlag && success) {
      console.log('user logged in')
      loggedIn = true;
      authFlag = false;
      students.orderByChild('userToken').equalTo(user.uid).once('value', function(snapshot) {
        snapshot.forEach(function(child) {
          console.log(child.val());
          parent = child.key;
          console.log(parent);
          // res.send(child.val());
        })
        res.render('dashboard');
      })
    }
  })
});

router.post('/logout', function(req, res, next) {
  console.log('user logged out');
  firebase.auth().signOut().catch(function(error) {
    console.log(error);
  });
  loggedIn = false;
  console.log(parent);
  res.redirect('/');
});

// students.orderByChild('email').equalTo(req.body['email']).on('value', function(snapshot) {
//   snapshot.forEach(function(child) {
//     parent = child.key;
//     console.log(parent);
//     stdRef = students.child(parent);
//     stdRef.child('FIRST').on('value', function(snapshot) {
//       var name = JSON.stringify(snapshot.val());
//       console.log(name)
//       res.render('dashboard', { name: name })
//     });
//   })
// });
module.exports = router;
