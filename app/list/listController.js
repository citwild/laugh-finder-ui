angular.module('laughResearchApp.videoList', ['ngRoute'])

.config(['$routeProvider', 'adalAuthenticationServiceProvider', function($routeProvider, adalProvider) {
    // list of videos page
    $routeProvider
        .when('/list', {
            templateUrl: 'app/list/listView.html',
            controller: 'listController',
	    requireADLogin: true
        })

}])

.service('listService', ['$http', '$window', function($http, $window) {
    return {
        getAssets: function () {
            var t = $window.sessionStorage.getItem('adal.idtoken');
            return $http.post(
                'https://137.135.51.94/blob/list/lfassets/video',
                {
                    data: t
                }
            );
        }
    }
}])

.controller('listController', ['$scope', '$location', 'listService', 'adalAuthenticationService', function($scope, $location, listService, adalService) {

    $scope.logout = function() {
        adalService.logOut();
    }

    // 1. Get asset listing from AWS
    listService.getAssets().then(
        function success(response) {
            return $scope.assets = response.data;
        },
        function error(response) {
            alert('Failed to get video asset information')
        }
    );

    // 2. Set bucket and values for HTML iteration
    var videoRX = /<Name>([a-zA-Z0-9\/\-_]*\.[Mm][Pp]4)<\/Name>/g;

    $scope.$watch('assets', function () {
        if ($scope.assets) {
	    $scope.s3Keys = [];
	    let match = videoRX.exec($scope.assets);
	    while (match) {
	        $scope.s3Keys.push(match[1]);
		match = videoRX.exec($scope.assets);
            }
        }
    });
}]);
