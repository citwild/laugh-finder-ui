angular.module('laughResearchApp.viewer')

.component('instanceList', {
    templateUrl: 'app/viewer/instanceList/instance-list.html',
    controller: function InstanceListController($scope) {

        // Watch for changes in parent scope
        $scope.$parent.$watch('video', function() {
                $scope.instances = $scope.$parent.video.foundLaughters.timestamps;
        });

        /////////////////////////////////////////////////////////
        // Helper methods
        /////////////////////////////////////////////////////////
        $scope.goToTime = function goToTime(value) {
            $scope.$parent.player.currentTime(value);
        };
    }
});
