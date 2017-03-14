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
        deleteParticipant: function (id) {
            return $http.delete(
                //'http://localhost:16000/metadata/participant/' + id + '/delete'
                'https://52.37.207.59/rest/metadata/participant/' + id + '/delete'
            );
        },
        deleteInstance: function (id) {
            return $http.delete(
                //'http://localhost:16000/instance/' + id + '/delete'
                'https://52.37.207.59/rest/instance/' + id + '/delete'
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
        $scope.goToTime = function (value) {
            $scope.$parent.player.currentTime(value);
        };

        $scope.removeParticipant = function(id) {
            let deleteParticipant = confirm(
                "Delete participant ID #" + id + "?"
            );
            if (deleteParticipant) {
                instanceListService.deleteParticipant(id);
                window.location.reload(false);
            }
        };

        $scope.showMetadataForm = true;
        $scope.toggleMetadataForm = function() {
            $scope.showMetadataForm = !$scope.showMetadataForm;
        };

        $scope.deleteInstance = function(instance) {
            let deleteInstance = confirm(
                "This instance has " + instance.participants.length + " participants in it.\n\n" +
                "Delete Instance ID #" + instance.id + "?"
            );
            if (deleteInstance) {
                instanceListService.deleteInstance(instance.id);
                window.location.reload(false);
            }
        }
    }
});
