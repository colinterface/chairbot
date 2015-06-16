var app = angular.module('chairbotDashboard', ['angularMoment'])

app.service('DashboardService', function($http) {

  this.getUserData = function() {
    var promise = $http.get('/sessions').success(function(response) {
      return response;
    });
    return promise;
  };

  this.saveUserPrefs = function(prefs) {
    var promise = $http.put('/prefs', prefs).success(function(response) {
      return response;
    });
    return promise;
  }

  this.saveNotes = function(newNote, stars, $index) {
    var notes = {
      text: newNote,
      stars: stars,
      index: $index
    }
    $http.put('/sessions')
  }

})

app.controller('DashboardController', function($scope, DashboardService) {
  $scope.data = {}
  $scope.limit = 25;
  $scope.spacing = 90;
  $scope.duration = 250;
  $scope.getUserData = function() {
    DashboardService.getUserData().then(function(data) {
      $scope.data = data.data;
    });
  };

  $scope.saveUserPrefs = function() {
    var prefs = {
      limit: $scope.limit,
      reminderSpacing: $scope.spacing,
      reminderDuration: $scope.duration
    }
    DashboardService.saveUserPrefs(prefs);
  }

  setInterval($scope.getUserData, 1000);

});

app.controller('SessionController', function($scope, DashboardService) {
  $scope.notes = '';
  $scope.stars = 3;

  $scope.saveNotes = function(newNote, stars, $index) {
    // console.log(newNote);
    // console.log($index);
    DashboardService.saveNote(newNote, stars, $index)
  }
});
