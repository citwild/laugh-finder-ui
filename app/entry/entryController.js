angular.module('laughResearchApp.entry', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    // home page route
    $routeProvider
        .when('/', {
            templateUrl: 'app/entry/entryView.html',
            controller: 'entryController'
        })
}])

.controller('entryController', ['$scope', '$location', 'adalAuthenticationService', function($scope, $location, adalService) {
    $scope.logout = function() {
        adalService.logOut();
    }
}]);
