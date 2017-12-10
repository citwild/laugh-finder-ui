angular.module('laughResearchApp.viewer')

.service('addInstanceService', ['$http', function($http) {
    return {
        postNewInstance: function (videoId, json) {
            return $http.post(
                //'http://localhost:16000/metadata/video/' + videoId + '/instances/add',
                'https://137.135.51.94/rest/metadata/video/' + videoId + '/instances/add',
                json
            );
        }
    }
}])

.component('addInstanceForm', {
    templateUrl: 'app/viewer/instanceList/addInstanceForm/add-instance-form.html',
    controller: function ($scope, addInstanceService) {

        // 1. Get values from parent scope
        $scope.$parent.$watch('laughTypes', function () {
            if ($scope.$parent.laughTypes) {
                $scope.laughTypes = $scope.$parent.laughTypes;
                $scope.player = $scope.$parent.player;
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
            let result = {
                start:   $scope.start,
                stop:    $scope.stop,
                joke:    ($scope.joke) ? $scope.joke : false,
                speaker: ($scope.speaker) ? $scope.speaker : null
            };

            // reset form
            document.getElementById("add-instance").reset();

            // post to service
            addInstanceService.postNewInstance($scope.$parent.videoId, result).then(
                function success(response) {
                    console.log("[addInstanceFormController] New instance created: " + response.data);
                },
                function error(response) {
                    console.log("[addInstanceFormController] Failed to submit new instance");
                }
            );
            console.log(result)
        }

        /*
         * Set "start" to current timestamp
         */
        document.getElementById("setToCurrent-start").addEventListener("click", function(event) {
            let currStart = $scope.player.currentTime();
            let currStop  = document.getElementById("addInstance-stop").value

            if (currStart > currStop) {
                alert("Instance stop time cannot be less than instance start time.");
            } else {
                document.getElementById("addInstance-start").value = currStart;
            }
        }, false);

        /*
         * Set "stop" to current timestamp
         */
        document.getElementById("setToCurrent-stop").addEventListener("click", function(event) {
            let currStart = document.getElementById("addInstance-start").value
            let currStop  = $scope.player.currentTime();

            if (currStart > currStop) {
                alert("Instance stop time cannot be less than instance start time.");
            } else {
                document.getElementById("addInstance-stop").value = currStop;
            }
        }, false);
    }
});
