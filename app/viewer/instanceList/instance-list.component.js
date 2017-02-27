angular.module('laughResearchApp.viewer')

.filter('hmsTime', function(){
    return function (s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
        return hrs + ':' + mins + ':' + secs;
    };
})

.service('instanceListService', ['$http', function($http) {
    return {
        deleteParticipant: function(id) {
            return $http.delete(
                'http://localhost:16000/metadata/participant/' + id + '/delete'
            );
        }
    }
}])

.component('instanceList', {
    templateUrl: 'app/viewer/instanceList/instance-list.html',
    controller: function InstanceListController($scope, instanceListService) {

        // 1. Watch for changes in parent scope
        $scope.$parent.$watch('video', function () {
            if ($scope.$parent.video) {
                $scope.videoId = $scope.$parent.video.foundLaughters.videoId;
                console.log("[instanceList] Retrieved video ID: " + JSON.stringify($scope.videoId));
                $scope.instances = $scope.$parent.video.foundLaughters.instances;
                console.log("[instanceList] Retrieved laugh instances: " + JSON.stringify($scope.instances));
            }
        });
        $scope.$parent.$watch('laughTypes', function () {
            if ($scope.$parent.laughTypes) {
                $scope.laughTypes= $scope.$parent.laughTypes;
                console.log("[instanceList] Retrieved laugh types: " + JSON.stringify($scope.laughTypes));
            }
        });

        // 2. Begin helper methods
        $scope.goToTime = function goToTime(value) {
            $scope.$parent.player.currentTime(value);
        };

        $scope.removeParticipant = function(id) {
            instanceListService.deleteParticipant(id);
        };
    }
});
