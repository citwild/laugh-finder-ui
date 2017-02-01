angular.module('laughResearchApp.viewer')

.component('instanceList', {
    templateUrl: 'app/viewer/instanceList/instance-list.html',
    controller: function InstanceListController($scope) {
        $scope.instances = $scope.$parent.video.foundLaughters.timestamps;
        //$scope.instance = $scope.$parent.getTimestamps();

        $scope.goToTime = function goToTime(value) {
            $scope.$parent.player.currentTime(value);
        };
    }
});
