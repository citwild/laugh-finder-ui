angular.module('laughResearchApp.login', ['ngRoute'])

.config(['$routeProvider', function loginConfig($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'app/login/loginView.html',
            controller: 'loginController'
        })
}])

.controller('loginController', ['$scope', '$http', function LoginController($scope, $http) {

}]);