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
            let currStop  = parseFloat(document.getElementById("addInstance-stop-hr").value) * 60 * 60
                            + parseFloat(document.getElementById("addInstance-stop-min").value) * 60
                            + parseFloat(document.getElementById("addInstance-stop-sec").value)
                            + parseFloat(document.getElementById("addInstance-stop-ms").value) / 1000;
            console.log(currStop);
            if (currStop && currStart > currStop) {
                let clearStop = confirm("Instance stop time cannot be less than instance start time.\n\nUse this start time anyway?");
                if (clearStop) {
                    resetInputBoxes("stop");
                    setTimeOfInputBoxes(currStart, "start");
                }
            } else {
                setTimeOfInputBoxes(currStart, "start");
            }
        }, false);

        /*
         * Set "stop" to current timestamp
         */
        document.getElementById("setToCurrent-stop").addEventListener("click", function(event) {
            let currStop  = $scope.player.currentTime();
            let currStart = parseFloat(document.getElementById("addInstance-start-hr").value) * 60 * 60
                            + parseFloat(document.getElementById("addInstance-start-min").value) * 60
                            + parseFloat(document.getElementById("addInstance-start-sec").value)
                            + parseFloat(document.getElementById("addInstance-start-ms").value) / 1000;
            console.log(currStart);
            if (currStart && currStart > currStop) {
                let clearStart = confirm("Instance stop time cannot be less than instance start time.\n\nUse this stop time anyway?");
                if (clearStart) {
                    resetInputBoxes("start");
                    setTimeOfInputBoxes(currStop, "stop");
                }
            } else {
                setTimeOfInputBoxes(currStop, "stop");
            }
        }, false);

        function setTimeOfInputBoxes(input, startStop) {
                seconds = input * 1000;
                var ms = seconds % 1000;
                seconds = (seconds - ms) / 1000;
                var secs = seconds % 60;
                seconds = (seconds - secs) / 60;
                var mins = seconds % 60;
                var hrs = (seconds - mins) / 60;
                document.getElementById("addInstance-" + startStop + "-hr").value = hrs;
                document.getElementById("addInstance-" + startStop + "-min").value = mins;
                document.getElementById("addInstance-" + startStop + "-sec").value = secs;
                document.getElementById("addInstance-" + startStop + "-ms").value = ms;
        }
        function resetInputBoxes(startStop) {
                document.getElementById("addInstance-" + startStop + "-hr").value = null;
                document.getElementById("addInstance-" + startStop + "-min").value = null;
                document.getElementById("addInstance-" + startStop + "-sec").value = null;
                document.getElementById("addInstance-" + startStop + "-ms").value = null;
        }

        document.getElementById('playAddInstanceSegment').addEventListener("click", function(event) {
            let currStart = document.getElementById("addInstance-start").value;
            let currStop  = document.getElementById("addInstance-stop").value;

            function stopWhenDone() {
                if ($scope.player.currentTime() > currStop) {
                    $scope.player.pause();
                    $scope.player.off('timeupdate', stopWhenDone);
                }
            }

            if (currStart && currStop) {
                $scope.player.currentTime(currStart);
                $scope.player.play();
                $scope.player.on('timeupdate', stopWhenDone);
            } else {
                alert("Start or stop time is not defined.");
            }
        });

    }
});
