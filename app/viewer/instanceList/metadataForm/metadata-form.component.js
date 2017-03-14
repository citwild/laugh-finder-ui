angular.module('laughResearchApp.viewer')

.service('metadataService', ['$http', function($http) {
    return {
        updateParticipantData: function(instanceId, json) {
            return $http.post(
                'http://localhost:16000/metadata/instance/' + instanceId + '/participants/add',
                json
            );
        },
        updateInstanceData: function(instanceId, json) {
            return $http.post(
                'http://localhost:16000/instance/' + instanceId + '/update',
                json
            );
        }
    }
}])

.component('metadataForm', {
    templateUrl: 'app/viewer/instanceList/metadataForm/metadata-form.html',
    controller: function($scope, metadataService) {

        // 0. Sync component before grabbing data
        this.$onInit = function () {

            // 1. Get data from parent scope
            let ctrl = this;
            console.log(ctrl.instance);
            console.log(ctrl.laughTypes);
            $scope.instance = ctrl.instance;
            $scope.laughTypes = ctrl.laughTypes;

            // 2. Define helper functions

            // 2.a. Show speaker field method
            $scope.hideSpeakerField = true;
            $scope.disableSpeakerField = function (bool) {
                document.getElementById('speaker').disabled = bool;
                $scope.hideSpeakerField = bool;
            };

            // 2.b. Form submission methods
            $scope.updateParticipantData = function () {
                let requestBody = $scope.newParticipant;
                metadataService.updateParticipantData($scope.instance.id, requestBody).then(
                    function success(response) {
                        console.log(response);
                    },
                    function error(response) {
                        console.log(response);
                    }
                );
            };

            $scope.updateInstanceData = function () {
                let result = {
                    joke: $scope.instance.joke,
                    speaker: $scope.instance.speaker,
                    algCorrect: $scope.instance.algCorrect
                };

                metadataService.updateInstanceData($scope.instance.id, result).then(
                    function success(response) {
                        console.log(response);
                    },
                    function error(response) {
                        console.log(response);
                    }
                );
            };
        }
    },
    bindings: {
        instance: '<',
        laughTypes: '<'
    }
});
