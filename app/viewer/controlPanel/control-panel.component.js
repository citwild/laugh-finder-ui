angular.module('laughResearchApp.viewer')

.component('controlPanel', {
    templateUrl: 'app/viewer/controlPanel/control-panel.html',
    controller: function ($scope) {

        $scope.currRate = 1;

        //////////////////////////////////////////////////////
        // Copied from parent scope. So video player is reset
        // per every page navigation.
        //////////////////////////////////////////////////////
        $scope.player;
        $scope.$on('$destroy', function() {
            // destroy the object if it exists
            if (($scope.player !== undefined) && ($scope.player !== null)) {
                $scope.player.dispose();
            }
        });
        // Manually loading the videojs
        videojs('my-video').ready(function() {
            $scope.player = $scope.$parent.player; // Store the object on a variable
        });

        //////////////////////////////////////////////////////
        // Begin video controller methods
        //   - Using $watch to avoid undefined console errors
        //////////////////////////////////////////////////////
        $scope.$watch('player', function() {
            if ($scope.player) {
                $scope.goToTime = function goToTime(value) {
                    $scope.player.currentTime(value);
                };

                // playback rate function (tied to slider)
                $scope.changeRate = function changeRate(rate) {
                    $scope.player.playbackRate(rate);
                    $scope.currRate = rate;
                };

                $scope.playStop = function playStop() {
                    if ($scope.player.paused()) {
                        $scope.player.play();
                    } else {
                        $scope.player.pause();
                    }
                };

                $scope.playNormally = function playNormally() {
                    // reset rate values
                    $scope.player.playbackRate(1);
                    $scope.currRate = 1;

                    // reset slider position
                    document.getElementById('rate-slider').value = 1;
                };

                $scope.skipBack = function skipBack() {
                    var skipAmt = parseInt(document.getElementById('skip-amt').value);
                    this.goToTime($scope.player.currentTime() - skipAmt);
                };

                $scope.skipForward = function skipForward() {
                    var skipAmt = parseInt(document.getElementById('skip-amt').value);
                    this.goToTime($scope.player.currentTime() + skipAmt);
                };
            }
        });
    }
});
