var express = require('express');
var router = express.Router();

var { firebase } = require('../public/javascripts/config.js')
const auth = firebase.auth();
const students = firebase.database().ref().child('users').child('students');
const admin = firebase.database().ref().child('users').child('admin');

router.get('/', function(req, res, next) {
  if (global.admin == undefined) {
    res.redirect('/?e=user');
  }
  else {
    admin.child(global.admin).once('value', function(snapshot) {
      // console.log(snapshot.val());
      userData = snapshot.val();
      students.on('value', function(snapshot) {
        // console.log(snapshot.child(0).val());
        studentData = snapshot.val();
        res.render('admin', { data: userData, studentData: studentData });
      })
    });
  }
})

module.exports = router;
