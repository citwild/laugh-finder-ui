angular.module('laughResearchApp.viewer')

.service('typeService', ['$http', function($http) {
    return {
        getTypes: function() {
            return $http.get(
                'http://localhost:16000/types/get/all'
            );
        },
        postNewType: function(json) {
            return $http.post(
                'http://localhost:16000/types/add',
                json
            );
        },
        postConsideredUpdate: function(json) {
            return $http.post(
                'http://localhost:16000/types/update',
                json
            );
        }
    }
}])

.component('typeManager', {
    templateUrl: 'app/viewer/typeManager/type-manager.html',
    controller: function($scope, typeService) {

        // 1. Get laugh types
        $scope.$watch('laughTypes', function () {});
        typeService.getTypes().then(
            function success(response) {
                $scope.laughTypes = response.data;
            },
            function error(response) {
                console.log("[typeManager] failed to load laugh types");
            }
        );

        // 2. Define helper methods
        $scope.updateTypes = function() {
            // get from ng-model values
            console.log(JSON.stringify($scope.laughTypes));

            typeService.postConsideredUpdate($scope.laughTypes);
        };

        $scope.postNewType = function() {
            // get from ng-model values
            var typeName = $scope.typeName,
                typeDesc = $scope.typeDesc,
                result = {
                    name: typeName,
                    desc: typeDesc
                };

            // reset form
            document.getElementById('add-type').reset();

            // post to service
            typeService.postNewType(result);

            // refresh types (set to timeout so not run before database has as chance to update)
            setTimeout(function() {
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