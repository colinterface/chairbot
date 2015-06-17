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
  $scope.limit = 3;
  $scope.spacing = 1;
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
  $scope.numSessions = null;
  $scope.currentStars = null;

  $scope.getUserData = function() {
    DashboardService.getUserData().then(function(data) {
      if (data.data.sessions.length > $scope.numSessions) {
        console.log('numSessions')
        $scope.data = data.data;
        $scope.currentStars = data.dayStars;
        $scope.numSessions = data.data.sessions.length;
      } else if (data.data.dayStars !== $scope.currentStars) {
        // console.log('currentStars:', $scope.currentStars, '');
        $scope.data = data.data;
        $scope.currentStars = data.data.dayStars;
      }
    });
  };

  setInterval($scope.getUserData, 1000);

});

app.controller('SessionController', function($scope, DashboardService) {
  // $scope.note = $scope.$parent.data.sessions[$index].text || '';
  // $scope.rate = $scope.$parent.data.sessions[$index].rating || 3;
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
