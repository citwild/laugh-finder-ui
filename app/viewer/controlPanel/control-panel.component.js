angular.module('laughResearchApp.viewer')

.component('controlPanel', {
    templateUrl: 'app/viewer/controlPanel/control-panel.html',
    controller: function ($scope) {

        $scope.currRate = 1;


        // 1. Copied from parent scope. So video player is reset
        //    per every page navigation.
        $scope.player;
        $scope.$on('$destroy', function() {
            // destroy the object if it exists
            if (($scope.player !== undefined) && ($scope.player !== null)) {
                $scope.player.dispose();
            }
        });


        // 2. Manually loading the videojs
        videojs('my-video').ready(function() {
            $scope.player = $scope.$parent.player; // Store the object on a variable
        });


        // 3. Begin video controller methods
        //      - Using $watch to avoid undefined console errors
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
                    let skipAmt = parseInt(document.getElementById('skip-amt').value);
                    this.goToTime($scope.player.currentTime() - skipAmt);
                };

                $scope.skipForward = function skipForward() {
                    let skipAmt = parseInt(document.getElementById('skip-amt').value);
                    this.goToTime($scope.player.currentTime() + skipAmt);
                };
            }
        });


        // 4. Define hotkeys
        document.addEventListener('keydown', function (e) {
            // following keys require shift combination
            if (e.ctrlKey) {

                // 's' focuses on skip amount
                if (e.key === 's') {
                    e.preventDefault();
                    document.getElementById('skip-amt').focus();
                }
                // 'r' focuses on skip amount
                if (e.key === '0') {
                    e.preventDefault();
                    document.getElementById('play-normal').click();
                }
                // left (i.e., '<')
                if (e.key === ',') {
                    e.preventDefault();
                    document.getElementById('seek-left').click()
                }
                // right (i.e., '>')
                if (e.key === '.') {
                    e.preventDefault();
                    document.getElementById('seek-right').click();
                }
                // space plays video
                if (e.key === ' ') {
                    e.preventDefault();
                    document.getElementById('play-stop').click();
                }

                if (e.key === '[') {
                    e.preventDefault();
                    if ($scope.currRate > 0) {
                        $scope.currRate = ($scope.currRate - 0.1);
                        $scope.player.playbackRate($scope.currRate);
                    }
                    document.getElementById('rate-slider').value = $scope.currRate;
                    document.getElementById('rate-num');
                }
                if (e.key === ']') {
                    e.preventDefault();
                    if ($scope.currRate < 3) {
                        $scope.currRate = ($scope.currRate + 0.1);
                        $scope.player.playbackRate($scope.currRate);
                    }
                    document.getElementById('rate-slider').value = $scope.currRate;
                }
            }
        }, false);
    }
});
