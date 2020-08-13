var express = require('express');
var router = express.Router();

var { firebase } = require('../public/javascripts/config.js')
const auth = firebase.auth();
const students = firebase.database().ref().child('users').child('students');

var data;

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (global.parent == undefined) {
    res.redirect('/?e=user');
  }
  else {
    students.child(global.parent).once('value', function(snapshot) {
      // console.log(snapshot.val().FIRST);
      data = snapshot.val();
      res.render('selection', { data: data, message: "" });
    })
  }
});

router.post('/', function(req, res, next) {
  students.child(global.parent).child('selection').set({
    "ela": req.body['ela'],
    'math': req.body['math'],
    'science': req.body['science'],
    'history': req.body['history'],
    'elective': req.body['elective']
  });
  message = "Selection submitted. \n Feel free to change your selection up until the due date."
  res.render('selection', { data: data, message: message })
})

module.exports = router;
