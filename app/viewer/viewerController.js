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
        // Get the video data
        getVideo: function (bucket, key) {
            var t = $window.sessionStorage.getItem('adal.idtoken');
            return $http.post(
                'https://137.135.51.94/blob/get/' + bucket  + '/' + key,
                {
                    data: t
                }
            );
        }
        
    }
}])

.controller('viewerController', ['$scope', '$routeParams', '$location', '$window', 'instanceService', function ($scope, $routeParams, $location, $window, instanceService) {

    // 1. Establish video asset's source (domain, bucket, key)
    let assetUri = "https://137.135.51.94/blob/get/",
        bucket = $routeParams.bucket,
        key = $routeParams.key;

    $scope.videoId = bucket + "/" + key;
    let videoUrl = assetUri + $scope.videoId;


    // 2. Create video source element (since ng-src does not work as expected)
    let source = document.getElementById('source');
    instanceService.getVideo(bucket, key).then(
        function success(response) {
            // 2.a. Base64 encode video bytes returned
            /*let videoBytes = btoa(
                encodeURIComponent(response.data).replace(/%([0-9A-F]{2})/g,
                    function toSolidBytes(match, p1) {
                        return String.fromCharCode('0x' + p1);
                    }
            ));*/
            // 2.b. Set source to data
            source.setAttribute('src', '???');
            //source.setAttribute('src', 'data:video/mp4;base64,' + videoBytes);
        },
        function error(response) {
            console.alert("Failed to load video");
        }
    );


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
