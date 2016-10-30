var videoViewerApp = angular.module('videoViewerApp', []);

videoViewerApp.controller('ViewerController', function ViewerController($scope) {
    $scope.player = videojs('my-video');

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
});
