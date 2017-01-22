angular.module('laughResearchApp.viewer')

.component('controlPanel', {
    templateUrl: 'app/viewer/controlPanel/control-panel.html',
    controller: function ControlPanelController($scope) {
        var player = $scope.$parent.player;

        $scope.goToTime = function goToTime(value) {
            player.currentTime(value);
        };

        // playback rate function (tied to slider)
        $scope.changeRate = function changeRate() {
            var rate = document.getElementById('rate-slider').value;
            player.playbackRate(rate);
            document.getElementById('rate-num').innerHTML = rate;
        };

        $scope.playStop = function playStop() {
            if (player.paused()) {
                player.play();
            } else {
                player.pause();
            }
        }

        $scope.playNormally = function playNormally() {
            // reset rate values
            player.playbackRate(1);
            document.getElementById('rate-num').innerHTML = '1';

            // reset slider position
            document.getElementById('rate-slider').value = 1;
        };

        $scope.skipBack = function skipBack() {
            var skipAmt = parseInt(document.getElementById('skip-amt').value);
            this.goToTime(player.currentTime() - skipAmt);
        };

        $scope.skipForward = function skipForward() {
            var skipAmt = parseInt(document.getElementById('skip-amt').value);
            this.goToTime(player.currentTime() + skipAmt);
        };
    }
});
