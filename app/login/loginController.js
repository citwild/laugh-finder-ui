angular.module('laughResearchApp.login', ['ngRoute'])

.config(['$routeProvider', function loginConfig($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'app/login/loginView.html',
            controller: 'loginController'
        })
}])

.controller('loginController', ['$scope', '$location', function($scope, $location) {
    $scope.authenticateUser = function(user, pass, newPass) {
        $scope.user = user;

        let authData = {
            Username: user,
            Password: pass
        };
        let authDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authData);

        let userData = {
            Username: user,
            Pool: $scope.userPool
        };
        let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.authenticateUser(authDetails, {
            onSuccess: function(result) {
                console.log('access token =' + result.getAccessToken().getJwtToken());

                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'us-west-2:686c4ff8-338d-4556-8c56-76dce4ea8524',
                    Logins: {
                        'cognito-idp.us-west-2.amazonaws.com/us-west-2_bDWDs5ptX': result.getIdToken().getJwtToken()
                    }
                });
                $location.path('/home');
            },
            onFailure: function (err) {
                alert(err);
            },
            newPasswordRequired: function(userAttrs, requiredAttrs) {
                // delete userAttrs.email_verified;
                cognitoUser.completeNewPasswordChallenge(newPass,null,this);
            }
        })
    };
}]);
