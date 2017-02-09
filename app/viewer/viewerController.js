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
        getInstances: function getInstances(bucket, key) {
            // return $http.get('https://52.37.207.59:16000/analyze/video?bucket=' + bucket + '&key=' + key)
            return $http.get('http://localhost:8080');
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
    });

    // 4. Get video's laugh data and metadata from web service 

    $scope.$watch('video', function (){});

    instanceService.getInstances("bucket", "key").then(
        function success(response) {
            console.log("HTTP GET successful");
            // $scope.video = response.data;
            $scope.video = {
                foundLaughters: {
                    filename: "testurl",
                    length: 72000,
                    timestamps: [
                        {
                            start: 15000,
                            stop: 20000,
                            categories: [
                                "unilateral",
                                "isolated",
                                "alleviating"
                            ],
                            participants: [
                                "mark"
                            ]
                        }
                    ]
                }
            };
        },
        function error(response) {
            alert("failed to load video laugh data and metadata. see console for details.");
        }
    );


    // P.S.:
    //   Method used to refresh VideoJS in one-page app context was taken from here:
    //     https://log.rowanto.com/angularjs-and-videojs-problem-video-only-loaded-on-hard-refresh-but-not-on-switching-page/
}]);
