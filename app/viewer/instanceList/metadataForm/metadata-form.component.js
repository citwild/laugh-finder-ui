angular.module('laughResearchApp.viewer')

.service('metadataService', ['$http', function($http) {
    return {
        getTypes: function() {
            return $http.get(
                'http://localhost:16000/types/get/all'
            );
        },
        updateParticipantData: function(instanceId, bucket, key, json) {
            return $http.post(
                'http://localhost:16000/metadata/put/instanceId/' + instanceId + '?bucket=' + bucket + '&key=' + key,
                json);
        },
        updateInstanceData: function(instanceId, bucket, key, json) {
            return $http.post(
                'http://localhost:16000/metadata/put/instanceId/' + instanceId + '?bucket=' + bucket + '&key=' + key,
                json);
        }
    }
}])

.component('metadataForm', {
    templateUrl: 'app/viewer/instanceList/metadataForm/metadata-form.html',
    controller: function($scope, metadataService) {
        // 0. Sync component before grabbing data
        this.$onInit = function() {

            // 1. Get data from parent scope
            var ctrl = this;
            console.log(ctrl.instance);
            $scope.instance = ctrl.instance;

            // 2. Get additional data
            metadataService.getTypes().then(
                function success(response) {
                    $scope.types = response.data;
                },
                function error(response) {
                    console.log("[metadataForm] failed to load laugh types");
                }
            );

            // 3. Define helper functions
            $scope.hideSpeakerField = true;
            $scope.disableSpeakerField = function (bool) {
                document.getElementById('speaker').disabled = bool;
                $scope.hideSpeakerField = bool;
            };

            $scope.submitForm = function (instanceId, bucket, key, requestBody) {
                metadataService.putMetadata(instanceId, bucket, key, requestBody).then(
                    function success(response) {
                        console.log(response);
                    },
                    function error(response) {
                        console.log(response);
                    }
                );
            }
        }
    },
    bindings: {
        instance: '<'
    }
});
