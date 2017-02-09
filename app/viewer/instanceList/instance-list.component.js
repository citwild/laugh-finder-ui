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
