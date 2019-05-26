
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Connect to the MongoDB
let url = 'mongodb://localhost:27017/myApp' || process.env.MONGODB_URI;
mongoose.connect(url,{ useNewUrlParser: true });

// Create Express application
var app = module.exports = express();

var NODE_ENV = 'development';
//Set Variables
app.set('env', process.env.NODE_ENV || 'production');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

routes = require('./routes/TodoRoute');
var router = express.Router();
app.use('/', (req,res,next)=>{
    console.log('req.body',req.body)
    console.log('req.params',req.params)

    let body  = req.body;
    if(body.challenge){
     res.json(req.body);
    }
    next();
});

app.use('/', routes);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Use environment defined port or 4000
var port = process.env.PORT || 3700;

// Start the server
app.listen(port);
console.log('App Running on port ' + port);


