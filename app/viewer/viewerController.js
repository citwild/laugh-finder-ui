angular.module('laughResearchApp.viewer', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    // viewer page
    $routeProvider
        .when('/viewer', {
            templateUrl: 'app/viewer/viewerView.html',
            controller: 'viewerController'
        });

}])

.service('instanceService', ['$http', function ($http) {
    return {
        getInstances: function(bucket, key) {
            // return $http.get('https://52.37.207.59:16000/analyze/video?bucket=' + bucket + '&key=' + key)
            return $http.get('http://localhost:16000/analyze/video?bucket=' + bucket + '&key=' + key)
        }
    }
}])

.controller('viewerController', ['$scope', '$routeParams', 'instanceService', function ($scope, $routeParams, instanceService) {

    // 1. Establish video asset's source (domain, bucket, key)
    var s3Domain = "https://s3-us-west-2.amazonaws.com/",
        bucket = $routeParams.bucket,
        key = $routeParams.key;

    $scope.videoId = bucket + "/" + key;
    var videoUrl = s3Domain + $scope.videoId;


    // 2. Create video source element (since ng-src does not work as expected)
    var source = document.getElementById('source');
    source.setAttribute('src', videoUrl);


    // 3. Kill and reinitialize VideoJS, if necessary
    $scope.player;
    $scope.$on('$destroy', function() {
        // Destroy the object if it exists
        if (($scope.player !== undefined) && ($scope.player !== null)) {
            $scope.player.dispose();
        }
    });
    videojs('my-video').ready(function() {
        $scope.player = this;

        // remove following components, since they're not used
        $scope.player.removeChild('BigPlayButton');
        $scope.player.getChild('ControlBar').removeChild('PlayToggle');
        $scope.player.getChild('ControlBar').removeChild('ChaptersButton');
        $scope.player.getChild('ControlBar').removeChild('FullscreenToggle');
    });

    // 4. Get video's laugh data and metadata from web service
    $scope.$watch('video', function (){});

    instanceService.getInstances(bucket, key).then(
        function success(response) {
            $scope.video = response.data;
        },
        function error(response) {
            console.log("failed to load video laugh data and metadata");
        }
    );


    // P.S.:
    //   Method used to refresh VideoJS in one-page app context was taken from here:
    //     https://log.rowanto.com/angularjs-and-videojs-problem-video-only-loaded-on-hard-refresh-but-not-on-switching-page/
}]);
