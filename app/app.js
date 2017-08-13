angular.module('laughResearchApp', [
    'ngRoute',
    'AdalAngular',
    'laughResearchApp.entry',
    'laughResearchApp.home',
    'laughResearchApp.videoList',
    'laughResearchApp.viewer'
])

.config(['$routeProvider', '$locationProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, $locationProvider, $httpProvider, adalProvider) {
    $httpProvider.defaults.withCredentials = true;

    // unknown URLs go back to login
    $routeProvider.otherwise({redirectTo: '/'});

    // for dealing with hashbang nonsense
    $locationProvider.html5Mode(true).hashPrefix('!');

    adalProvider.init(
	{
            instance: 'https://login.microsoftonline.com/',
            tenant: 'theloonyiroonihotmail.onmicrosoft.com',
            clientId: 'ec8790b0-1a50-47e4-aec4-f64c20bd1886',
            extraQueryParameter: 'nux=1'
        },
	$httpProvider
    );
}])

.controller('mainController', ['$scope', function ($scope) {

}]);
