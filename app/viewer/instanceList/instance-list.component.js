angular.module('laughResearchApp.viewer')

.component('instanceList', {
    templateUrl: 'app/viewer/instanceList/instance-list.html',
    controller: function InstanceListController($scope) {

        setTimeout(function() {
            $scope.instances = $scope.$parent.video.foundLaughters.timestamps;
            console.log(JSON.stringify($scope.instances));
        }, 200);

        $scope.goToTime = function goToTime(value) {
            $scope.$parent.player.currentTime(value);
        };
    }
});
