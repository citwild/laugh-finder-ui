angular.module('laughResearchApp.login', ['ngRoute'])

.config(['$routeProvider', function loginConfig($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'app/login/loginView.html',
            controller: 'loginController'
        })
}])

.controller('loginController', ['$scope', 'authService', function($scope, authService) {
    $scope.login = function () {
        authService.authenticateUser($scope.creds).then(
            function success(response) {

            },
            function error(response) {
                console.log(response);
            }
        )
    }
}]);