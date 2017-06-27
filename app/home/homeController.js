angular.module('laughResearchApp.home', ['ngRoute'])

.config(['$routeProvider', function homeConfig($routeProvider) {
    // home page route
    $routeProvider
        .when('/home', {
            templateUrl: 'app/home/homeView.html',
            controller: 'mainController',
            requireLogin: true
        })
}])

.controller('mainController', ['$scope', '$http', '$window', 'authService', function MainController($scope, $http, $window, authService) {
    authService.checkIsAuthenticated().then(
        function success() {
            // do nothing
        },
        function error(response) {
            $window.location.href = '#!/login';
        }
    );

    $scope.name = "Miles";
}]);
