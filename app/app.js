angular.module('laughResearchApp', [
        'ngRoute',
        'laughResearchApp.home',
        'laughResearchApp.videoList',
        'laughResearchApp.viewer'
])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    // unknown URLs go back to home
    $routeProvider.otherwise({redirectTo: '/'});

    // for dealing with hashbang nonsense
    $locationProvider.hashPrefix('!');
}]);
