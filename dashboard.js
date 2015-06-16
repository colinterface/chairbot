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
  $scope.numSessions = 0;

  $scope.getUserData = function() {
    DashboardService.getUserData().then(function(data) {
      if (data.data.sessions.length > $scope.numSessions) {
        $scope.data = data.data;
        $scope.numSessions = data.data.sessions.length;
      }
    });
  };

  setInterval($scope.getUserData, 1000);

});

app.controller('SessionController', function($scope, DashboardService) {
  // $scope.note = $scope.$parent.data.sessions[$index].text || '';
  // $scope.rate = $scope.$parent.data.sessions[$index].rating || 3;
  // $scope.note = session.text;
  $scope.max = 5;

  $scope.saveNote = function(session) {
    if (session.text !== '') {
      var index = $scope.data.sessions.indexOf(session)
      DashboardService.saveNote(session.text, index)
    }
  }

  $scope.saveRating = function(session) {
    var index = $scope.data.sessions.indexOf(session)
    DashboardService.saveRating(session.rating, index)
  }
});
