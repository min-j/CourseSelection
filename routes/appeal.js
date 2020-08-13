var express = require('express');
var router = express.Router();

var { firebase } = require('../public/javascripts/config.js')
const auth = firebase.auth();
const students = firebase.database().ref().child('users').child('students');

var data;

router.get('/', function(req, res, next) {
  if (global.parent == undefined) {
    res.redirect('/?e=user');
  }
  else {
    students.child(global.parent).once('value', function(snapshot) {
      console.log(snapshot.val().FIRST);
      data = snapshot.val();
      res.render('appeal', { data: data, message: '' });
    })
  }
});

router.post('/', function(req, res, next) {
  students.child(global.parent).child('appeal').push({
    'class': req.body['class'],
    'reasoning': req.body['reasoning'],
  });
  res.render('appeal', { data: data, message: 'Appeal submitted.' })
});

module.exports = router;
