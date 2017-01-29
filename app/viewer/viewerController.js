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

    $scope.videoId = $routeParams.bucket + "/" + $routeParams.key;

    var s3Domain = "https://s3-us-west-2.amazonaws.com/",
        videoUrl = s3Domain + $scope.videoId;

    // HACK: set video element's source, since angular binding doesn't work >:(
    var source = document.getElementById('source');
    source.setAttribute('src', videoUrl);

    // Have to kill VideoJS when moving away from page
    //   See: https://log.rowanto.com/angularjs-and-videojs-problem-video-only-loaded-on-hard-refresh-but-not-on-switching-page/
    // initialize videojs after element source is created
    $scope.player;
    $scope.$on('$destroy', function() {
        // Destroy the object if it exists
        if (($scope.player !== undefined) && ($scope.player !== null)) {
            $scope.player.dispose();
        }
    });
    // Manually loading the videojs
    videojs('my-video').ready(function() {
        $scope.player = this; // Store the object on a variable
    });

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
