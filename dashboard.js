var app = angular.module('chairbotDashboard', [])

app.service('DashboardService', function($http) {

  this.getUserData = function() {
    var promise = $http.get('/sessions').success(function(response) {
      return response;
    });
    return promise;
  };

  this.saveUserPrefs = function(prefs) {
    var promise = $http.put('/prefs').success(function(response) {
      return response;
    });
    return promise;
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
    $scope.limit = '';
    $scope.spacing = '';
    $scope.duration = '';
  }

  setInterval($scope.getUserData, 1000);

});
