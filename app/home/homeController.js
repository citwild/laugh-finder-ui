angular.module('laughResearchApp.home', ['ngRoute'])

.config(['$routeProvider', function homeConfig($routeProvider) {
    // home page route
    $routeProvider
        .when('/home', {
            templateUrl: 'app/home/homeView.html',
            controller: 'mainController',
            access: {
                loginRequired: true
            }
        })
}])

.controller('mainController', ['$scope', '$http', function MainController($scope, $http) {
    $scope.name = "Miles";
}]);
