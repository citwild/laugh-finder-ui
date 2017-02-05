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
    });


    // 4. Get video's laugh data and metadata from web service
    //$http.get( getRestUrl(bucket, key) )
    /*$scope.getTimestamps = function() {
        $http.get('https://52.37.207.59:16000/analyze/video?bucket=beamcoffer&key=Compressed/2014-01-31/Huddle/00079-320.MP4')
        .then(
            function success(response) {
                //$scope.video = response.data;
                return response.data;
            },
            function error(error) {
                alert("Failed to load video laugh data and metadata. See console for details.")
            }
        );
    }*/



    /////////////////////////////////////////////////////////////////////////////
    // Helper Methods
    /////////////////////////////////////////////////////////////////////////////
    function getRestUrl(bucket, key) {
        return 'https://52.37.207.59:16000/analyze/video?bucket=' + bucket + '&key=' + key;
    }

    // hardcoded mock data
    $scope.video = {
        foundLaughters: {
            filename: $scope.videoId,
            length: 72000,
            timestamps: [
                {
                    start: 15000,
                    stop: 20000,
                    categories: [
                        "Unilateral",
                        "Isolated",
                        "Alleviating"
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
        }
    };

    // P.S.:
    //   Method used to refresh VideoJS in one-page app context was taken from here:
    //     https://log.rowanto.com/angularjs-and-videojs-problem-video-only-loaded-on-hard-refresh-but-not-on-switching-page/
}]);
