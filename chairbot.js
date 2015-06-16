var five = require("johnny-five");
var board = new five.Board();
var request = require('request-json');
var client = request.createClient('http://localhost:8000/');
var timediff = require('timediff');


var session;
var sitting = false;

// use default settings until the request comes back
var settings = {
  // minutes
  limit: 25,
  // seconds
  reminderSpacing: 90,
  // milliseconds
  reminderDuration: 250
};

// REMEMBER TO TEST THIS BEFORE THE DEMO!
client.get('/prefs', function(error, response, body) {
  settings = JSON.parse(body);
  console.log(response.statusCode);
});


var intervalObject;
var led;

var Session = function() {
  this.start = new Date();
  console.log('session started at ' + this.start);

  var context = this;

  setTimeout(function() {
    console.log('you\'ve been sitting for ' + settings.limit + ' seconds');
    context.reminder();

    clearInterval(intervalObject);
    intervalObject = setInterval(function () {
      context.reminder();

    }, settings.reminderSpacing * 1000);
  }, settings.limit * 1000);
}

Session.prototype.end = function() {
  this.end = new Date();
  console.log('session ended at ' + this.end);
  clearInterval(intervalObject);

  client.post('/sessions', {
    start: this.start,
    end: this.end,
    // use time diff to calculate length of session in seconds
    // keep only the seconds with no object to keep things simple
    duration: timediff(this.start, this.end, 'S').seconds,
    text: '',
    rating: 3
  }, function(error, response, body) {
    console.log(response.statusCode);
  });
}

Session.prototype.reminder = function() {
  led.on();
  setTimeout(function() {
    led.off();
  }, settings.reminderDuration * 1000);
}

board.on("ready", function() {
  led = new five.Led(13);

  // since i don't have the proper limit switch i'm using a potentiometer
  // 0 value means the person is seated
  potentiometer = new five.Sensor({ pin: "A3", freq: 500 });

  potentiometer.on("data", function() {
    if (this.value === 0) {
      if (!sitting) {
        sitting = true;
        session = new Session();
      }
    } else {
      if (sitting) {
        sitting = false;
        session.end()
      }
    }
  });
});
