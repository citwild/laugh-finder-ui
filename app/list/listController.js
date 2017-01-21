angular.module('laughResearchApp.videoList', ['ngRoute'])

.config(['$routeProvider', function videoListConfig($routeProvider) {
    // list of videos page
    $routeProvider
        .when('/list', {
            templateUrl: 'app/list/listView.html',
            controller: 'listController'
        })

}])

.controller('listController', ['$scope', '$http', function ListController($scope, $http) {
    $scope.videoList = [
        "video1",
        "video2"
    ];
}]);
