angular.module('laughResearchApp.viewer', ['ngRoute'])

.config(['$routeProvider', function viewerConfig($routeProvider) {
    // viewer page
    $routeProvider
        .when('/viewer', {
            templateUrl: 'app/viewer/viewerView.html',
            controller: 'viewerController'
        });

}])

.controller('viewerController', ['$scope', '$http', '$routeParams', function ViewerController($scope, $http, $routeParams) {

    var s3Domain = "https://s3-us-west-2.amazonaws.com/";

    $scope.videoId = $routeParams.bucket + "/" + $routeParams.key;
    $scope.videoUrl = s3Domain + $scope.videoId;

    $scope.player = videojs('my-video');

    $scope.video = {
        filename: $scope.videoId,
        length: 72000,
        instances: [
            {
                start: 15000,
                stop: 20000,
                categories: [
                    "Unilateral",
                    "Isolated",
                ],
                participants: [
                    "Mark"
                ]
            },
            {
                start: 43000,
                stop: 47000,
                categories: [
                    "Joint",
                    "Diffusing"
                ],
                participants: [
                    "Aytul",
                    "Fida"
                ]
            }
        ]
    };
}]);
