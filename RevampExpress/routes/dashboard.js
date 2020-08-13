var express = require('express');
var router = express.Router();

var { firebase } = require('../public/javascripts/config.js')
const auth = firebase.auth();
const students = firebase.database().ref().child('users').child('students');
const admins = firebase.database().ref().child('users').child('admin');

var data;

router.get('/', function(req, res, next) {
  if (global.parent == undefined) {
    res.redirect('/?e=user');
  }
  else {
    res.render('dashboard', { data: data });
  }
});

router.get('/guide', function(req, res, next) {
  res.render('guide')
})

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
      console.log('user logged in');
      authFlag = false;
      students.orderByChild('userToken').equalTo(user.uid).once('value', function(snapshot) {
        snapshot.forEach(function(child) {
          // console.log(child.val());
          data = child.val();
          console.log(data);
          global.parent = child.key;
          // console.log(parent);
          res.render('dashboard', { data : data });
        })
      })
      admins.orderByChild('userToken').equalTo(user.uid).once('value', function(snapshot) {
        snapshot.forEach(function(child) {
          // console.log(child.val());
          global.admin = child.key;
          // console.log(parent);
          res.redirect('/admin');
        })
      })
    }
  })
});

router.post('/logout', function(req, res, next) {
  console.log('user logged out');
  firebase.auth().signOut().catch(function(error) {
    console.log(error);
  });
  global.parent = undefined;
  global.admin = undefined;
  // console.log(data);
  res.redirect('/');
});

module.exports = router;
