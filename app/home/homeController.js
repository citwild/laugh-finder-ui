angular.module('laughResearchApp.home', ['ngRoute'])

.config(['$routeProvider', function homeConfig($routeProvider) {
    // home page route
    $routeProvider
        .when('/home', {
            templateUrl: 'app/home/homeView.html',
            controller: 'mainController',
            resolve: {
                load: function($q, $location, authService) {
                    let deferred = $q.defer();
                    authService.checkIsAuthenticated().then(
                        function success(d) { deferred.resolve() },
                        function error(d) { deferred.reject("unauthenticated") }
                    );
                    return deferred.promise;
                }
            }
        })
}])

.controller('mainController', ['$scope', '$location', function MainController($scope, $location) {
    // 0. Verify logged in before loading
    $scope.$on('$routeChangeError', function(evt, curr, prev, reject) {
        if (reject === "unauthenticated") {
            $location.path('/login');
        }
    });
    $scope.name = "Miles";
}]);
