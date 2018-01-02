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

/**
 * A filter to affect display of instance timestamps
 */
.filter('hmsTime', function(){
    return function (s) {
        s = s * 1000
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        if (ms   < 100) ms   = '0' + ms;
        if (ms   < 10)  ms   = '0' + ms;
        if (secs < 10)  secs = '0' + secs;
        if (mins < 10)  mins = '0' + mins;
        if (hrs  < 10)  hrs  = '0' + hrs;

        return hrs + ':' + mins + ':' + secs + "." + ms;
    };
})

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
    // 1. Define variables and get data from services
    $scope.user_email = adalService.userInfo.profile.email;

    // Show counts (user should try to keep this even)
    $scope.correctSamples = 0;
    $scope.incorrectSamples = 0;

    $scope.samplesPerVideo = {};

    manageModelService.getEligibleSamples().then(
        function success(response) {
            $scope.retrainSamples = response.data.retrainingSamples;
            
            $scope.retrainSamples.forEach(function(elem) {
                // Determine correctness
                if (elem.algCorrect) {
                    $scope.correctSamples++;
                } else {
                    $scope.incorrectSamples++;
                }

                // Add to map (so list can be organized per video)
                let vid = elem.bucket + "/" + elem.key;
                if (!$scope.samplesPerVideo[vid]) {
                    $scope.samplesPerVideo[vid] = [];
                }
                $scope.samplesPerVideo[vid].push({
                    correct: elem.algCorrect,
                    start: elem.startTime,
                    stop: elem.stopTime,
                    url: "bucket=" + elem.bucket + "&key=" + elem.key,

                });
            });

            console.log(
                "[manageModelController] eligible samples: " + JSON.stringify($scope.retrainSamples)
            );
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

    // 2. Begin helper functions

    /**
     * For changing between models
     */
    $scope.switchModel = function() {
        let confirmed = window.confirm(
            "Are you sure you want to switch the model used?"
        );

        if (confirmed) {
            let id = $("#model-select option:selected").val();

            manageModelService.switchModel(id).then(
                function success(response) {
                    alert("Model successfully switched to ID #" + id + "!");
                },
                function error(response) {
                    alert('Failed to switch the model. Try again later.')
                }
            );
        }
    }

    /**
     * For training new models
     */
    $scope.trainModel = function() {
        let confirmed = window.confirm(
            "Are you sure you want to generate a new model using the given samples?"
        );

        if (confirmed) {
            manageModelService.retrainModel().then(
                function success(response) {
                    alert("Model successfully created!");
                },
                function error(response) {
                    alert('Failed to train new model. Try again later.')
                }
            );
        }
    }

}]);
