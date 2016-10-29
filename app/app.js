var videoViewerApp = angular.module('videoViewerApp', []);

videoViewerApp.controller('ViewerController', function ViewerController($scope) {
    $scope.video = {
        name: 'beamcoffer/20161029/GOPRO/123.mp4',
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
    }

    $scope.playNormally = function playNormally() {
        // reset rate values
        player.playbackRate(1);
        document.getElementById('rate-num').innerHTML = 1;

        // reset slider position
        document.getElementById('rate-slider').value = 1;
    }

    $scope.skipBack = function skipBack() {
        var skipAmt = document.getElementById('skip-amt').value;
        this.goToTime(player.currentTime() - skipAmt);
    }

    $scope.skipForward = function skipForward() {
        var skipAmt = document.getElementById('skip-amt').value;
        this.goToTime(player.currentTime() + skipAmt);
    }
});

/*.filter('msToTimestamp', function() {
    return function(milliseconds) {
        var second = 1000,
            minute = second * 60,
            hour   = minute * 60;
        
        var seconds = Math.floor((milliseconds % minute) / second),
            minutes = Math.floor((milliseconds % hour) / minute),
            hours   = Math.floor(milliseconds / hour);

        var timestring = '';
        timestring += (hours !== 0) hours : '00:';
        timestring += (minutes !== 0) minutes : '00:';
        timestring += (seconds !== 0) seconds : '00';

        return timestring;
    };
});*/
