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

        // 1. Get values from parent scope
        $scope.$parent.$watch('laughTypes', function () {
            if ($scope.$parent.laughTypes) {
                $scope.laughTypes= $scope.$parent.laughTypes;
                console.log("[addInstanceFormController] Retrieved laugh types: " + JSON.stringify($scope.laughTypes));
            }
        });

        // 2. Define helper methods
        $scope.hideSpeakerField = true;
        $scope.disableSpeakerField = function () {
            $scope.hideSpeakerField = document.getElementById('speaker').checked;
        };

        $scope.addInstance = function () {
            // get values
            var result = {
                    videoId: $scope.$parent.videoId,
                    start: $scope.start,
                    stop: $scope.stop,
                    joke: $scope.joke,
                    speaker: $scope.speaker
                };

            // reset form
            document.getElementById("add-instance").reset();

            // post to service
            // addInstanceService.postNewInstance(videoId, result);
            console.log(result)
        }
    }
});
