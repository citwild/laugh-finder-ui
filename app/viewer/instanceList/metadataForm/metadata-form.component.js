angular.module('laughResearchApp.viewer')

.service('metadataService', ['$http', function($http) {
    return {
        putMetadata: function(instanceId, bucket, key, requestBody) {
            return $http.put(
                'http://localhost:16000/metadata/put/instanceId/' + instanceId + '?bucket=' + bucket + '&key=' + key,
                requestBody);
        }
    }
}])

.component('metadataForm', {
    templateUrl: 'app/viewer/instanceList/metadataForm/metadata-form.html',
    controller: function($scope, metadataService) {
        this.$onInit = function() {
            // 1. Get data from parent scope
            var ctrl = this;
            console.log(ctrl.instance);

            // 2. Define helper functions
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
