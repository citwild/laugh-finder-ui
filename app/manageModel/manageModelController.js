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
        },
        getAllModels: function () {
            return $http.get(
                'https://137.135.51.94/rest/model/get/all'
            );
        },
        getEligibleSamples: function () {
            return $http.get(
                'https://137.135.51.94/rest/instance/training-eligible-samples'
            );
        }
    }
}])

.controller('manageModelController', ['$scope', '$location', 'manageModelService', 'adalAuthenticationService', function($scope, $location, manageModelService, adalService) {
    $scope.user_email = adalService.userInfo.profile.email;

    manageModelService.getEligibleSamples().then(
        function success(response) {
            $scope.retrainSamples = response.data.retrainingSamples;
            console.log("[manageModelController] eligible samples: " + JSON.stringify($scope.retrainSamples));
        },
        function error(response) {
            alert('Failed to get samples elibible for retraining.')
        }
    );

    manageModelService.getAllModels().then(
        function success(response) {
            $scope.models = response.data.models;
            console.log("[manageModelController] models: " + JSON.stringify($scope.models));
        },
        function error(response) {
            alert('Failed to get list of available models.')
        }
    );

}]);
