var videoViewerApp = angular.module('videoViewerApp', []);

videoViewerApp.controller('ViewerController', function ViewerController($scope) {
    $scope.video = {
        filename: 'beamcoffer/20161029/GOPRO/123.mp4',
        length: 72000,
        instances: [
            {
                start: 15000,
                stop: 20000,
                categories: [
                    "Unilateral",
                    "Isolated",
                ],
                participants: [
                    "Mark"
                ]
            },
            {
                start: 43000,
                stop: 47000,
                categories: [
                    "Joint",
                    "Diffusing"
                ],
                participants: [
                    "Aytul",
                    "Fida"
                ]
            },
            {
                start: 56000,
                stop: 59000,
                categories: [
                    "Joint",
                    "Isolated"
                ],
                participants: [
                    "Socha",
                    "Wei"
                ]
            },
            {
                start: 63000,
                stop: 65000,
                categories: [
                    "Unilateral"
                ],
                participants: [
                    "Miles"
                ]
            }
        ]
    };

    $scope.goToTime = function goToTime(value) {
        player.currentTime(value);
    };

    // playback rate function (tied to slider)
    $scope.changeRate = function changeRate() {
        var rate = document.getElementById('rate-slider').value;
        player.playbackRate(rate);
        document.getElementById('rate-num').innerHTML = rate;
    };

    $scope.playNormally = function playNormally() {
        // reset rate values
        player.playbackRate(1);
        document.getElementById('rate-num').innerHTML = '1';

        // reset slider position
        document.getElementById('rate-slider').value = 1;
    };

    $scope.skipBack = function skipBack() {
        var skipAmt = document.getElementById('skip-amt').value;
        this.goToTime(player.currentTime() - skipAmt);
    };

    $scope.skipForward = function skipForward() {
        var skipAmt = document.getElementById('skip-amt').value;
        this.goToTime(player.currentTime() + skipAmt);
    }
});
