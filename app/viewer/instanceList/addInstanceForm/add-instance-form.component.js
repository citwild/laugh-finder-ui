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
        $scope.addInstance = function () {
            // get values
            let result = {
                start:   getSecondsFromInputBoxes("start"),
                stop:    getSecondsFromInputBoxes("stop"),
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


        let warning = "Instance stop time cannot be less than instance start time.\n\nUse this start time anyway?";

        /*
         * Set "start" to current timestamp
         */
        document.getElementById("setToCurrent-start").addEventListener("click", function(event) {
            let currStart = $scope.player.currentTime();
            let currStop  = getSecondsFromInputBoxes("stop");

            if (currStop && currStart > currStop) {
                let clearStop = confirm(warning);
                if (clearStop) {
                    resetInputBoxes("stop");
                    setTimeOfInputBoxes(currStart, "start");
                }
            } else {
                setTimeOfInputBoxes(currStart, "start");
            }
                console.log(getSecondsFromInputBoxes("start"));
                console.log(getSecondsFromInputBoxes("stop"));
        }, false);

        /*
         * Set "stop" to current timestamp
         */
        document.getElementById("setToCurrent-stop").addEventListener("click", function(event) {
            let currStop  = $scope.player.currentTime();
            let currStart = getSecondsFromInputBoxes("start");

            if (currStart && currStart > currStop) {
                let clearStart = confirm(warning);
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
            let ms = Math.floor(seconds % 1000);
            seconds = (seconds - ms) / 1000;
            let secs = Math.floor(seconds % 60);
            seconds = (seconds - secs) / 60;
            let mins = Math.floor(seconds % 60);
            let hrs = Math.floor((seconds - mins) / 60);
            setInputBoxes(startStop, hrs, mins, secs, ms);
        }

        function resetInputBoxes(startStop) {
            setInputBoxes(startStop, null, null, null, null);
        }

        function setInputBoxes(startStop, hr, min, sec, ms) {
            document.getElementById("addInstance-" + startStop + "-hr").value = hr;
            document.getElementById("addInstance-" + startStop + "-min").value = min;
            document.getElementById("addInstance-" + startStop + "-sec").value = sec;
            document.getElementById("addInstance-" + startStop + "-ms").value = ms;
        }

        function getSecondsFromInputBoxes(startStop) {
            return parseFloat(document.getElementById("addInstance-" + startStop + "-hr").value) * 60 * 60
                   + parseFloat(document.getElementById("addInstance-" + startStop + "-min").value) * 60
                   + parseFloat(document.getElementById("addInstance-" + startStop + "-sec").value)
                   + parseFloat(document.getElementById("addInstance-" + startStop + "-ms").value) / 1000;
        }


        document.getElementById('playAddInstanceSegment').addEventListener("click", function(event) {
            let currStart = getSecondsFromInputBoxes("start");
            let currStop  = getSecondsFromInputBoxes("stop");

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
