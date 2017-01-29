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
        {
            "name": "expert-carpenter.mp4",
            "bucket": "miles-test-assets",
            "key": "folder1/folder2/expert-carpenter.mp4"
        },
        {
            "name": "expert-carpenter.mp4",
            "bucket": "miles-test-assets",
            "key": "folder1/folder2/expert-carpenter.mp4"
        }
    ];
}]);
