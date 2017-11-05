angular.module('laughResearchApp.viewer', ['ngRoute'])

.config(['$routeProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, adalProvider) {
    // viewer page
    $routeProvider
        .when('/viewer', {
            templateUrl: 'app/viewer/viewerView.html',
            controller: 'viewerController',
	    requireADLogin: true
        });
}])

.service('instanceService', ['$http', '$window', function ($http, $window) {
    return {
        // Get user-defined laughter types
        getTypes: function() {
            return $http.get(
                'https://137.135.51.94/rest/types/get/all'
            );
        },
        // Get laughter instances
        getInstances: function(bucket, key) {
            return $http.get(
                'https://137.135.51.94/rest/analyze/video?bucket=' + bucket + '&key=' + key
            );
        },
    }
}])

.controller('viewerController', ['$scope', '$routeParams', '$location', '$window', 'instanceService', function ($scope, $routeParams, $location, $window, instanceService) {

    // 1. Establish video asset's source (domain, bucket, key)
    let assetUri = "https://137.135.51.94/blob/get/",
        bucket = $routeParams.bucket,
        key = $routeParams.key;

    $scope.videoId = bucket + "/" + key;
    let videoUrl   = assetUri + $scope.videoId;


    // 2. Create video source element (since ng-src does not work as expected)
    let source = document.getElementById('source');
    source.setAttribute('src', assetUri + $scope.videoId);

    // 3. Kill and reinitialize VideoJS, if necessary
    $scope.player;
    $scope.$on('$destroy', function() {
        // Destroy the object if it exists
        if (($scope.player !== undefined) && ($scope.player !== null)) {
            $scope.player.dispose();
        }
    });

    // 4. When the video is done loading, do the following:
    videojs('my-video').ready(function() {
        $scope.player = this;

        // 4.a. Remove unused components
        $scope.player.removeChild('BigPlayButton');
        $scope.player.getChild('ControlBar').removeChild('PlayToggle');
        $scope.player.getChild('ControlBar').removeChild('ChaptersButton');
        $scope.player.getChild('ControlBar').removeChild('FullscreenToggle');


        // 4.b. Play time segment if start/stop times present as query params
        let beginTime = getParameterByName("b");
        let endTime   = getParameterByName("e");
        if (beginTime) {
            $scope.player.currentTime(beginTime);
            $scope.player.play();

            if (endTime) {
                $scope.player.on('timeupdate', function () {
                    if ($scope.player.currentTime() > endTime) {
                        $scope.player.pause();
                        $scope.player.off('timeupdate');
                    }
                });
            }
        }
    });


    // 4. Get video's laugh data and metadata from web service
    $scope.$watch('video', function (){});

    instanceService.getInstances(bucket, key).then(
        function success(response) {
            $scope.video = response.data;
            console.log("[viewerController] Instance data: " + JSON.stringify($scope.video));

            // Add markers to video bar
            var instances = $scope.video.foundLaughters.instances;
            var markers   = [];
            for (var i = 0; i < instances.length; i++) {
                var seconds = (instances[i].start/1000).toFixed(1);
                markers.push({
                    time: seconds, text: seconds + " seconds"
                });
            }
            videojs('my-video').markers({
                markers: markers
            });
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



    // Helper method to read query params (taken from StackOverflow)
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }


    // P.S.:
    //   Method used to refresh VideoJS in one-page app context was taken from here:
    //     https://log.rowanto.com/angularjs-and-videojs-problem-video-only-loaded-on-hard-refresh-but-not-on-switching-page/
}]);
