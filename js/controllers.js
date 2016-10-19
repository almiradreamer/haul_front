app.controller('mainCtrl', function($scope, $rootScope, $window, AuthService) {
  $rootScope.token = $window.localStorage['token'];
  $rootScope.userId = $window.localStorage['userId'];
  
  $scope.p = 4;
  $scope.isLoggedIn = function () {
    if ($window.localStorage['token']) {return true}
      return false;
  }
  $scope.logout = function () {
    
    AuthService.logout();
    $rootScope.showingForm = 'login';
  }
  $scope.$on('tokenExpired', function() {
    $scope.logout();
  })
  if ($scope.isLoggedIn()) {
    $rootScope.showingForm = 'news';
  } else {
    $rootScope.showingForm = 'login';
  }
})
app.controller('loginCtrl', function($scope, $rootScope, AuthService, Server) {
  $scope.login = function(credentials) {
    AuthService.login(credentials)
  }
})
app.controller('globalCtrl', function($scope, $rootScope, Server) {
  $scope.data = '{"func":"getGlobalNews"}';
  Server.fetchGet($scope.data, $rootScope.token).then(function(data) {
    $scope.$apply(function() {
      $scope.items = data;
    })
  })
})
app.controller('signupCtrl', function($scope, $rootScope, Server) {
  $scope.role = 0;

  $scope.signup = function() {
    $scope.data = '{"func":"addUser","login":"';
    $scope.data += $scope.username;
    $scope.data += '", "pass":"';
    $scope.data += $scope.password;
    $scope.data += '", "role":"' + $scope.role;
    $scope.data += '", "name":"' + $scope.name;
    $scope.data += '", "surname":"' + $scope.surname;
    $scope.data += '", "email":"' + $scope.email;
    $scope.data += '", "photo":"' + 0 + '"}';
    alert($scope.data);
    $scope.name = $scope.data;
    Server.fetchSignUp($scope.data).then(function(data) {

    })
  }
  
})
app.controller('newsCtrl', function($scope, $rootScope, Server) {
  
})