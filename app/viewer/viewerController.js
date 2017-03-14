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
        getTypes: function() {
            return $http.get(
                //'http://localhost:16000/types/get/all'
                'https://52.37.207.59/rest/types/get/all'
            );
        },
        getInstances: function(bucket, key) {
            return $http.get(
                //'http://localhost:16000/analyze/video?bucket=' + bucket + '&key=' + key
                'https://52.37.207.59/rest/analyze/video?bucket=' + bucket + '&key=' + key
            );
        }
    }
}])

.controller('viewerController', ['$scope', '$routeParams', 'instanceService', function ($scope, $routeParams, instanceService) {

    // 1. Establish video asset's source (domain, bucket, key)
    // let s3Domain = "https://52.37.207.59/s3/",
    let s3Domain = "https://s3-us-west-2.amazonaws.com/",
        bucket = $routeParams.bucket,
        key = $routeParams.key;

    $scope.videoId = bucket + "/" + key;
    let videoUrl = s3Domain + $scope.videoId;


    // 2. Create video source element (since ng-src does not work as expected)
    let source = document.getElementById('source');
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
            console.log("[viewerController] Instance data: " + JSON.stringify($scope.video));
        },
        function error(response) {
            console.log("[viewerController] failed to load video laugh data and metadata");
        }
    );


    // 5. Get video's laugh type data from web service
    console.log("[viewerController] Getting laugh types");
    instanceService.getTypes().then(
        function success(response) {
            $scope.laughTypes = response.data;
            console.log("[viewerController] Laugh types: " + JSON.stringify($scope.laughTypes));
        },
        function error(response) {
            console.log("[viewerController] failed to load laugh type data");
        }
    );


    // P.S.:
    //   Method used to refresh VideoJS in one-page app context was taken from here:
    //     https://log.rowanto.com/angularjs-and-videojs-problem-video-only-loaded-on-hard-refresh-but-not-on-switching-page/
}]);
