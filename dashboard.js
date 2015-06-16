var app = angular.module('chairbotDashboard', ['angularMoment', 'ui.bootstrap']);

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
  };

  this.saveNote = function(newNote, $index) {
    var note = {
      text: newNote,
      index: $index
    }
    var promise = $http.put('/sessions/notes', note).success(function(response) {
      return response;
    });
    return promise;
  };

  this.saveRating = function(rating, $index) {
    var rating = {
      rating: rating,
      index: $index
    }
    var promise = $http.put('/sessions/ratings', rating).success(function(response) {
      return response;
    });
    return promise;
  };

})

app.controller('PrefsController', function($scope, DashboardService) {
  $scope.isCollapsed = true;
  $scope.limit = 25;
  $scope.spacing = 90;
  $scope.duration = 250;

  $scope.saveUserPrefs = function() {
    var prefs = {
      limit: $scope.limit,
      reminderSpacing: $scope.spacing,
      reminderDuration: $scope.duration
    }
    DashboardService.saveUserPrefs(prefs);
  }
});

app.controller('DashboardController', function($scope, DashboardService) {
  $scope.data = {}

  $scope.getUserData = function() {
    DashboardService.getUserData().then(function(data) {
      $scope.data = data.data;
    });
  };

  setInterval($scope.getUserData, 1000);

});

app.controller('SessionController', function($scope, DashboardService) {
  $scope.note = '';
  $scope.rate = 3;
  $scope.max = 5;

  $scope.saveNote = function(newNote, $index) {
    DashboardService.saveNote(newNote, $index)
  }

  $scope.saveRating = function(rate, $index) {
    DashboardService.saveRating(rate, $index)
  }
});
