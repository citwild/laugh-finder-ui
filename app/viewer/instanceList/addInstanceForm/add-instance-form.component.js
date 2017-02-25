angular.module('laughResearchApp.viewer')

.service('addInstanceService', ['$http', function($http) {
    return {
        postNewInstance: function (videoId, json) {
            return $http.post(
                'http://localhost:16000/instances/add/videoId/' + videoId,
                json
            );
        }
    }
}])

.component('addInstanceForm', {
    templateUrl: 'app/viewer/instanceList/addInstanceForm/add-instance-form.html',
    controller: function AddInstanceFormController($scope) {

        // 1. Define helper methods
        $scope.hideSpeakerField = true;
        $scope.disableSpeakerField = function (bool) {
            document.getElementById('speaker').disabled = bool;
            $scope.hideSpeakerField = bool;
        };

        $scope.addInstance = function () {
            // get values
            var result = {
                    start: $scope.start,
                    stop: $scope.stop,
                    joke: $scope.joke,
                    speaker: $scope.speaker
                };

            // reset form
            document.getElementById("add-instance").reset();

            // post to service
            addInstanceService.postNewInstance(videoId, result);
        }
    }
});
