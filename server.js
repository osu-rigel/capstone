    var express    = require('express')
    var path = require('path')
    var app        = express()
    var cookieParser = require('cookie-parser')
    var bodyParser = require('body-parser')
    var exphbs     = require('express-handlebars')
    
    var index = require('./routes/index')
    
// Authentication stuff
    var session    = require('express-session')
    var passport   = require('passport')



//For Handlebars
    app.set('views', './views')
    app.engine('hbs', exphbs({extname: '.hbs'}));
    app.set('view engine', '.hbs');
    
//For BodyParser
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));



/**************************************
app.get('/', function(req, res){
	  res.render('index');
	});
********************************************/	


app.use(session({
  secret: 'asdfasfovasvsdasvs',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);

app.listen(process.env.PORT,process.env.IP,function(err) {
 
    if (!err)
        console.log("Site is live");
    else console.log(err)
 
});