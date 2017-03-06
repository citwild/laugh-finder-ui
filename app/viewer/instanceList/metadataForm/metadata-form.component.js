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
                'http://localhost:16000/metadata/put/instanceId/' + instanceId,
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
            var ctrl = this;
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
                /*
                 {
                     "name":"test",
                     "intensity":"1",
                     "tags":{
                         "1":true,
                         "2":false,
                         "3":false,
                         "4":true,
                         "5":true
                     }
                 }
                 */
                var requestBody = $scope.newParticipant;
                metadataService.updateParticipantData($scope.instance.id, requestBody).then(
                    function success(response) {
                        console.log(response);
                    },
                    function error(response) {
                        console.log(response);
                    }
                );
            };

            $scope.updateInstanceData = function (instanceId, bucket, key, requestBody) {
                metadataService.updateInstanceData(instanceId, bucket, key, requestBody).then(
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
