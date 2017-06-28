angular.module('laughResearchApp', [
        'ngRoute',
        'laughResearchApp.login',
        'laughResearchApp.home',
        'laughResearchApp.videoList',
        'laughResearchApp.viewer'
])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    // unknown URLs go back to login
    $routeProvider.otherwise({redirectTo: '/login'});

    // for dealing with hashbang nonsense
    $locationProvider.hashPrefix('!');

    // $httpProvider.defaults.withCredentials = true;
}])

.service('authService', ['$http', function($http) {
    return {
        checkIsAuthenticated: function () {
            return $http.get('http://localhost:16000/auth/isAuthenticated');
        },
        authenticateUser: function (request) {
            return $http.post('http://localhost:16000/auth/login', request);
        }
    }
}]);
