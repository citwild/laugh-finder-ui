var laughResearchApp = angular.module('laughResearchApp', ['ngRoute']);

laughResearchApp.config(['$routeProvider', function ($routeProvider) {

    // home page
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        })

    // list of videos page
        .when('/list', {
            templateUrl: 'pages/list.html',
            controller: 'listController'
        })

    // viewer page
        .when('/viewer', {
            templateUrl: 'pages/viewer.html',
            controller: 'viewerController'
        })

        .otherwise({redirectTo: '/'});
}]);

laughResearchApp
    .controller('mainController', function MainController($scope) {
        $scope.name = "Miles";
    });

laughResearchApp
    .controller('listController', function ListController($scope) {
        $scope.videoList = [
            "video1",
            "video2"
        ];
    });

laughResearchApp
    .controller('viewerController', function ViewerController($scope, $routeParams) {
        $scope.player = videojs('my-video');

        $scope.videoId = $routeParams.id;

        $scope.video = {
            filename: $scope.videoId, //'beamcoffer/20161029/GOPRO/123.mp4',
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
