angular.module('laughResearchApp', [
        'ngRoute',
        'laughResearchApp.login',
        'laughResearchApp.home',
        'laughResearchApp.videoList',
        'laughResearchApp.viewer'
])

.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;

    // unknown URLs go back to login
    $routeProvider.otherwise({redirectTo: '/login'});

    // for dealing with hashbang nonsense
    $locationProvider.hashPrefix('!');
}])

.controller('mainController', ['$scope', function ($scope) {
    // Misc AWS configuration stuff
    AWS.config.region = 'us-west-2';

    $scope.poolData = {
        UserPoolId : 'us-west-2_bDWDs5ptX',
        ClientId : '4bnopnf8j9l661h9ahafm86vst'
    };
    $scope.userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool($scope.poolData);
}]);
