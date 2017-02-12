angular.module('laughResearchApp.viewer')

.service('typeService', ['$http', function($http) {
    return {
        getTypes: function() {
            return $http.get(
                'http://localhost:16000/types/get/all'
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
    }
});