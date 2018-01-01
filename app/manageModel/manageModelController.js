angular.module('laughResearchApp.manageModel', ['ngRoute'])

.config(['$routeProvider', 'adalAuthenticationServiceProvider', function($routeProvider, adalProvider) {
    // model manager page route
    $routeProvider
        .when('/model/laughter', {
            templateUrl: 'app/manageModel/manageModelView.html',
            controller: 'manageModelController',
	    requireADLogin: true
        })
}])

.service('manageModelService', ['$http', '$window', function($http, $window) {
    return {
        retrainModel: function () {
            return $http.post(
                'https://137.135.51.94/rest/model/retrain'
            );
        },
        switchModel: function (modelId) {
            return $http.post(
                'https://137.135.51.94/rest/model/changeto/' + modelId
            );
        }
    }
}])

.controller('manageModelController', ['$scope', '$location', 'adalAuthenticationService', function($scope, $location, adalService) {
    $scope.user_email = adalService.userInfo.profile.email;
}]);
