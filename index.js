var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(session({secret: 'evATNEhWDSu2J5S2Arrj5sz7'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/views", express.static(__dirname + "/views"));
app.use("/database", express.static(__dirname + "/database"));

var sess;

var port = 3000;

var requestcounter = 0;

// start the server
app.listen(port, function() {
    console.log('Lafa started listening on port: ' + port);
});

var sess;
app.get('/', function(req, res) {
    sess = req.session;
    res.sendFile('views/index.html', {root: __dirname});
});

app.post('/determine', function(req, res) {
    sess = req.session;
    if (req.body.type == "Patient") {
        res.redirect("/patient");
    } else {
        res.redirect("/doctor");
    }
});

app.get('/doctor', function(req, res) {
    sess = req.session;
    res.sendFile("views/doctor.html", {root: __dirname});
});

app.get('/patient', function(req, res) {
    sess = req.session;
    res.sendFile("views/patient.html", {root: __dirname});
});

app.get('/getPatientQuestion', function(req, res) {
    sess = req.session;
    fs.readFile('database/init.json', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        console.log("Sending data:")
        console.log(JSON.parse(data).Questions[0]);
        if(sess.stack==null) {
            res.send(JSON.stringify(JSON.parse(data).Questions[0]));
        }
        //res.send(data);
    });
    console.log("getting database/init.json " + req.body);
});

app.get('/setPatientQuestionResult', function(req, res) {

});
