var app = angular.module('chairbotDashboard', [])

app.service('DashboardService', function($http) {
  this.getUserData = function() {
    var promise = $http.get('/sessions').success(function(response) {
      return response;
    });
    return promise;
  };


})

app.controller('DashboardController', function($scope, DashboardService) {
  $scope.data = {}
  $scope.getUserData = function() {
    DashboardService.getUserData().then(function(data) {
      $scope.data = data.data;
    });
  };

  setInterval($scope.getUserData, 1000);

});
