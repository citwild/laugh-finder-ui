angular.module('laughResearchApp.videoList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    // list of videos page
    $routeProvider
        .when('/list', {
            templateUrl: 'app/list/listView.html',
            controller: 'listController'
        })

}])

.service('listService', ['$http', function($http) {
    return {
        getAssets: function () {
            return $http.get('https://miles-test-assets.s3-us-west-2.amazonaws.com');
        }
    }
}])

.controller('listController', ['$scope', 'listService', function($scope, listService) {

    // 1. Get asset listing from AWS
    listService.getAssets().then(
        function success(response) {
            return $scope.assets = response.data;
        },
        function error(response) {
            alert('Failed to get S3 asset information')
        }
    );

    // 2. Set bucket and values for HTML iteration
    var bucketRX = /<Name>(.*)<\/Name>/,
        videoRX = /<Key>([a-zA-Z0-9\/\-]*.mp4)<\/Key>/;

    $scope.$watch('assets', function () {
        $scope.bucket = bucketRX.exec($scope.assets)[1];
        $scope.s3Keys = videoRX.exec($scope.assets);
        $scope.s3Keys.shift();
        console.log($scope.bucket);
        console.log($scope.s3Keys);
    });
}]);
