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
    $scope.player = videojs('my-video');

    $scope.videoId = $routeParams.bucket + "/" + $routeParams.key;

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
            },
            {
                start: 56000,
                stop: 59000,
                categories: [
                    "Joint",
                    "Isolated"
                ],
                participants: [
                    "Socha",
                    "Wei"
                ]
            },
            {
                start: 63000,
                stop: 65000,
                categories: [
                    "Unilateral"
                ],
                participants: [
                    "Miles"
                ]
            }
        ]
    };
}]);
