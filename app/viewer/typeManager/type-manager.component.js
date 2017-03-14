angular.module('laughResearchApp.viewer')

.service('typeService', ['$http', function($http) {
    return {
        postNewType: function(json) {
            return $http.post(
                //'http://localhost:16000/types/add',
                'https://52.37.207.59/rest/types/add',
                json
            );
        },
        postConsideredUpdate: function(json) {
            return $http.post(
                //'http://localhost:16000/types/update',
                'https://52.37.207.59/rest/types/update',
                json
            );
        }
    }
}])

.component('typeManager', {
    templateUrl: 'app/viewer/typeManager/type-manager.html',
    controller: function($scope, typeService) {

        // 1. Get laugh types
        $scope.$parent.$watch('laughTypes', function () {
            if ($scope.$parent.laughTypes) {
                $scope.laughTypes= $scope.$parent.laughTypes;
                console.log("[typeManager] Retrieved laugh types: " + JSON.stringify($scope.laughTypes));
            }
        });

        // 2. Define helper methods
        $scope.updateTypes = function () {
            typeService.postConsideredUpdate($scope.laughTypes);
        };

        $scope.postNewType = function () {
            // get from ng-model values
            var result = {
                    type: $scope.typeName,
                    description: $scope.typeDesc
                };

            // reset form
            document.getElementById('add-type').reset();

            // post to service
            typeService.postNewType(result);

            // refresh types (set to timeout so not run before database has as chance to update)
            setTimeout(function () {
                typeService.getTypes().then(
                    function success(response) {
                        $scope.laughTypes = response.data;
                    },
                    function error(response) {
                        console.log("[typeManager] failed to load laugh types");
                    }
                );
            }, 500);
        };
    }
});
