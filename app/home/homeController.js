angular.module('laughResearchApp.home', ['ngRoute'])

.config(['$routeProvider', function homeConfig($routeProvider) {
    // home page route
    $routeProvider
        .when('/', {
            templateUrl: 'app/home/homeView.html',
            controller: 'mainController'
        })
}])

.controller('mainController', ['$scope', '$http', function MainController($scope, $http) {
    $scope.name = "Miles";
}]);
