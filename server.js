var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

var userData = {
  sessions: [
    {
    start: 'Mon Jun 15 2015 19:17:32 GMT-0700 (PDT)',
    end: 'Mon Jun 15 2015 19:18:32 GMT-0700 (PDT)',
    duration: 60
    },
    {
    start: 'Mon Jun 15 2015 19:20:32 GMT-0700 (PDT)',
    end: 'Mon Jun 15 2015 19:21:32 GMT-0700 (PDT)',
    duration: 60
    },
  ],
  dayTotal: 120,
  // add fake all time total for demo
  allTimeTotal: 100000
}


app.post('/sessions', function(request, response) {
  userData.sessions.push(request.body);
  userData.dayTotal += request.body.duration;
  userData.allTimeTotal += request.body.duration;
  response.status(201).end();
});

app.get('/sessions', function(request, response) {
  response.json(userData);
});

app.listen(8000);

console.log("server running at localhost:8000");
