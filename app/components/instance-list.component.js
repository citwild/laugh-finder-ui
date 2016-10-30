angular
.module('videoViewerApp')
.component('instanceList', {
    template:
        '<div class="instance" ng-repeat="instance in $ctrl.instances">' +
            '<ul class="tags">' +
                '<li ng-repeat="category in instance.categories">{{category}}</li>' +
            '</ul>' +
            '<div class="timestamp">' +
                '<span class="instance-start">Start: {{instance.start}}</span>' +
                '<br>' +
                '<span class="instance-stop">Stop: {{instance.stop}}</span>' +
            '</div>' +
            '<button class="goto-instance" ng-click="goToTime(instance.start/1000)">Go there</button>' +
        '</div>',

    controller: function InstanceListController($scope) {
        this.instances = $scope.$parent.video.instances;

        $scope.goToTime = $scope.$parent.goToTime;
    }
});