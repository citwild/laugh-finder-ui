angular.module('laughResearchApp.viewer')

.service('typeService', ['$http', function($http) {
    return {
        getTypes: function() {
            return $http.put(
                'http://localhost:16000/types/get/all'
            );
        }
    }
}])

.component('typeManager', {
    templateUrl: 'app/viewer/typeManager/type-manager.html',
    controller: function($scope, typeService) {

    }
});