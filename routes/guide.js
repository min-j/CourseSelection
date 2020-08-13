var express = require('express');
var router = express.Router();

var { firebase } = require('../public/javascripts/config.js')
const auth = firebase.auth();
const students = firebase.database().ref().child('users').child('students');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (global.parent == undefined) {
    res.redirect('/?e=user');
  }
  else {
    students.child(global.parent).once('value', function(snapshot) {
      // console.log(snapshot.val().FIRST);
      var data = snapshot.val();
      res.render('guide', { data: data});
    })
  }
});

module.exports = router;
