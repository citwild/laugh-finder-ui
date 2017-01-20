var laughResearchApp = angular.module('laughResearchApp', ['ngRoute']);

laughResearchApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
    // home page
        .when('/', {
            templateUrl: 'app/home/homeView.html',
            controller: 'mainController'
        })

    // list of videos page
        .when('/list', {
            templateUrl: 'app/list/listView.html',
            controller: 'listController'
        })

    // viewer page
        .when('/viewer', {
            templateUrl: 'app/viewer/viewerView.html',
            controller: 'viewerController'
        })

        .otherwise({redirectTo: '/'});

    $locationProvider.hashPrefix('!');
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
            filename: $scope.videoId,
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
