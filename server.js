var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

// start with some dummy data
var userData = {
  sessions: [
    {"start":"2015-06-16T03:48:08.971Z","end":"2015-06-16T03:48:17.484Z","duration":8},
    {"start":"2015-06-16T03:49:15.138Z","end":"2015-06-16T03:49:17.648Z","duration":2},
    {"start":"2015-06-16T03:49:19.655Z","end":"2015-06-16T03:49:23.162Z","duration":3},
    {"start":"2015-06-16T03:57:25.415Z","end":"2015-06-16T03:57:40.950Z","duration":15}
  ],
  dayTotal: 120,
  allTimeTotal: 100000
}

var userPrefs = {
  limit: 3,
  reminderSpacing: 2,
  reminderDuration: 0.5
};


app.post('/sessions', function(request, response) {
  userData.sessions.push(request.body);
  userData.dayTotal += request.body.duration;
  userData.allTimeTotal += request.body.duration;
  response.status(201).end();
});

app.get('/sessions', function(request, response) {
  response.json(userData);
});

app.put('/prefs', function(request, response) {
  var userPrefs = request.body;
});

app.get('/prefs', function(request, response) {
  response.json(userPrefs);
});

app.listen(8000);

console.log("server running at localhost:8000");
