var express = require('express');
var router = express.Router();
var app = express();
var http = require('http');
var port = process.env.PORT || 8080;
var cors = require('cors');
var bodyParser = require('body-parser')

// Pi Functions
var Pi = require('./lib/pi-firebase');

var data = require('./lib/object-firebase');

//Live Stream URL
var urlStream = '...';


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req,res,next){
    res.next();
})


app.get('/api/video', function(req,res,next){
    res.send(urlStream);
    res.next();
})

app.post('/api/tf', function(req,res){
    var id = req.body.objects[0].id;
    var name = req.body.objects[0].name;

    console.log(id + name);
    data.updateObjects(id,name);
    res.sendStatus(200);
})

app.post('/api/motion/', function(req,res){

    var motionString  = req.body.type;
    console.log(motionString);
    if(motionString == "STAT")
    {
        Pi.initialMovement();
        res.sendStatus(200);
    }
    else if(motionString == "FWRD")
    {
        Pi.updateUp(true);
        res.sendStatus(200);
    }
    else if(motionString == "BACK")
    {
        Pi.updateDown(true);
        res.sendStatus(200);
    }
    else if(motionString == "LEFT")
    {
        Pi.updateLeft(true);
        res.sendStatus(200);
    }
    else if(motionString == "RGHT")
    {
        Pi.updateRight(true);
        res.sendStatus(200);
    }
    else
    {
        res.send("Command not found!");
    }
})

// Server Running
app.listen(port);
console.log('The server is running on: ' + port);
