var app = angular.module("haul", ["ngMessages"]);

/*app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/main.htm'
		})
		.when('/news', {
			templateUrl: 'partials/news.htm'
		})
		.when('/world', {
			templateUrl: 'partials/world.htm'
		})
	    .when('/profile', {
	      templateUrl: 'partials/profile.htm'
	    })
	    .when('/likes', {
	      templateUrl: 'partials/likes.htm'
	    })
	    .when('/login', {
	      templateUrl: 'partials/login.htm'
	    })
	    .when('/signup', {
	      templateUrl: 'partials/signup.htm'
	    })
}) 
*/
app.service('Server', function (AuthService) {
  this.fetchGet = function (data, token) {
    var address = 'http://192.241.144.134:8080/requests';
    address += '?token=';
    address += token;
    address += '&data=';
    address += data;
    return fetch(address, {
          method: 'get',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
          }
        })
          .then(function(response) { 
            return response.json()
          }).then(function(data) {
            if (data.success == false) {
              return AuthService.logout();
            } else {
              return data;
            }
          })
  }
  this.fetch = function (data, token) {
    return fetch('http://192.241.144.134:8080/register', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              data: data,
              token: token
          })
        })
          .then(function(response) { 
            return response.json()
          }).then(function(data) {
            if (data.success == false) {
              return AuthService.logout();
            } else {
              return data;
            }
          })
  }
  this.fetch = function (data, token) {
    return fetch('http://192.241.144.134:8080/', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              data: data,
              token: token
          })
        })
          .then(function(response) { 
            return response.json()
          }).then(function(data) {
            if (data.success == false) {
              return AuthService.logout();
            } else {
              return data;
            }
          })
  }
})

app.factory('AuthService', function ($rootScope, $window) {
  var authService = {};
  authService.logout = function() {
    $window.localStorage.removeItem('token');
    $window.localStorage.removeItem('userId');
  }
  authService.login = function (credentials) {
    authService.logout();
    fetch('http://192.241.144.134:8080/api/authenticate', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        login: credentials.username,
                        password: credentials.password
                    })
                }).then(function(response) {
                    return response.json()
                  }).then(function(text) { 
                    if (text.success == true) {
                      $window.localStorage['token'] = text.token;
                      $window.localStorage['userId'] = text.id;
                      $rootScope.$apply(function() {$rootScope.token = $window.localStorage['token'];
                        $rootScope.userId = $window.localStorage['userId'];
                        $rootScope.loginError = undefined;;
                      })
                    } 
                    if (text.success == false) {
                      $rootScope.$apply(function() {
                        $rootScope.loginError = "Пользователь не найден";
                      })
                    }
                  }); 
    	return;
	};
	authService.isAuthenticated = function () {
	   return !!$rootScope.token;
	};
	 
	return authService;
})