angular.module('laughResearchApp', [
        'ngRoute',
        'laughResearchApp.login',
        'laughResearchApp.home',
        'laughResearchApp.videoList',
        'laughResearchApp.viewer'
])

.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;

    // unknown URLs go back to login
    $routeProvider.otherwise({redirectTo: '/login'});

    // for dealing with hashbang nonsense
    $locationProvider.hashPrefix('!');
}])

.controller('mainController', ['$scope', function ($scope) {

}]);
