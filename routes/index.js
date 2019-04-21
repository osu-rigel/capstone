var express = require('express');
var router = express.Router();
var passport   = require('passport')


var bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req);
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render('home', { title: 'Home' });
});


router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});


router.post('/register', function(req, res, next) {
    
  console.log (req.body);
  const firstname = req.body.firstname;
  const lastname  = req.body.lastname;
  const email     = req.body.email;
  const password  = req.body.password;
  
  // Pull the database here.
  const db = require ('../db.js');           // To go down one directory we use .. here.
 
 
 // To hash the password.
 bcrypt.hash(password, saltRounds, function(err, hash) {   
  // Store hash in your password DB.
      db.query('Insert INTO users (email,firstname, lastname, password) VALUES (?,?,?,?)',[email,firstname, lastname, hash],function(error,results,fields){  // These ? help prevent SQL injection attacks by escaping. The MYSQL packages automatically escapes values.
         if(error)
            throw error;
            
        db.query('SELECT LAST_INSERT_ID() as user_id',function(error,results,fields){
            if(err) throw error;
            const user_id = results[0];
            console.log(results[0]);
            req.login(user_id,function(err){
                res.redirect('/');
            });
        });
         // else render this page.
     });
});
     

 
});

passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
      done(null, user_id);
  });
module.exports = router;