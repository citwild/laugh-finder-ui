angular.module('laughResearchApp.viewer')

.service('addInstanceService', ['$http', function($http) {
    return {
        postNewInstance: function (bucket, id, json) {

        }
    }
}])

.component('addInstanceForm', {
    templateUrl: 'app/viewer/instanceList/addInstanceForm/add-instance-form.html',
    controller: function AddInstanceFormController($scope) {

        $scope.addInstance = function () {

        }
    }
});
