angular.module('laughResearchApp.home', ['ngRoute'])

.config(['$routeProvider', 'adalAuthenticationServiceProvider', function($routeProvider, adalProvider) {
    // home page route
    $routeProvider
        .when('/home', {
            templateUrl: 'app/home/homeView.html',
            controller: 'homeController',
	    requireADLogin: true
        })
}])

.controller('homeController', ['$scope', '$location', 'adalAuthenticationService', function($scope, $location, adalService) {
    $scope.name = adalService.userInfo.profile.given_name;
}]);
