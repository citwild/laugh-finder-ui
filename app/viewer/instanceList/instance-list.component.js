angular.module('laughResearchApp.viewer')

.filter('hmsTime', function(){
    return function (s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        if (ms   < 100) ms   = '0' + ms;
        if (ms   < 10)  ms   = '0' + ms;
        if (secs < 10)  secs = '0' + secs;
        if (mins < 10)  mins = '0' + mins;
        if (hrs  < 10)  hrs  = '0' + hrs;

        return hrs + ':' + mins + ':' + secs + "." + ms;
    };
})

.service('instanceListService', ['$http', function($http) {
    return {
        deleteParticipant: function (id) {
            return $http.delete(
                'https://137.135.51.94/rest/metadata/participant/' + id + '/delete'
            );
        },
        deleteInstance: function (id) {
            return $http.delete(
                'https://137.135.51.94/rest/instance/' + id + '/delete'
            );
        }
    }
}])

.component('instanceList', {
    templateUrl: 'app/viewer/instanceList/instance-list.html',
    controller: function InstanceListController($scope, instanceListService) {

        $scope.player = $scope.$parent.player;

        // 1. Watch for changes in parent scope
        $scope.$parent.$watch('video', function () {
            if ($scope.$parent.video) {
                $scope.videoId = $scope.$parent.video.foundLaughters.videoId;
                $scope.instances = $scope.$parent.video.foundLaughters.instances;

                $scope.instances.sort(compare);
            }
        });
        $scope.$parent.$watch('laughTypes', function () {
            if ($scope.$parent.laughTypes) {
                $scope.laughTypes= $scope.$parent.laughTypes;
            }
        });

        // 2. Begin helper methods
        // For "Go There" buttons for instances
        function stopWhenDone() {
            if ($scope.player.currentTime() > $scope.placeToEnd) {
                $scope.player.pause();
                $scope.player.off('timeupdate', stopWhenDone);
            }
        }
        $scope.goToTime = function (start, end) {
            $scope.player.currentTime(start);
            $scope.placeToEnd = end;

            // This conditional will automatically play the segment IF the
            //   the video is paused
            if ($scope.player.paused()) {
                $scope.player.play();
                $scope.player.on('timeupdate', stopWhenDone);
            }
        };

        // Delete a user. Prompt before doing so.
        $scope.removeParticipant = function(id) {
            let deleteParticipant = confirm(
                "Delete participant ID #" + id + "?"
            );
            if (deleteParticipant) {
                instanceListService.deleteParticipant(id);
                window.location.reload(false);
            }
        };

        /*$scope.showMetadataForm = true;
        $scope.toggleMetadataForm = function() {
            $scope.showMetadataForm = !$scope.showMetadataForm;
        };*/

        /*$scope.deleteInstance = function(instance) {
            let deleteInstance = confirm(
                "This instance has " + instance.participants.length + " participants in it.\n\n" +
                "Delete Instance ID #" + instance.id + "?"
            );
            if (deleteInstance) {
                instanceListService.deleteInstance(instance.id);
                window.location.reload(false);
            }
        };*/

        // Hide instance unless it's the one currently selected
        $scope.selectedIndex = 1;
        $scope.showInstance = function(instanceIndex) {
            return $scope.selectedIndex - 1 === instanceIndex;
        };
        $scope.decrementIndex = function() {
            if ($scope.selectedIndex > 1) {
                $scope.selectedIndex = $scope.selectedIndex - 1;

                $scope.changeTimePerInstanceIndex($scope.selectedIndex);
            }
        };
        $scope.incrementIndex = function() {
            if ($scope.selectedIndex < $scope.instances.length) {
                $scope.selectedIndex = $scope.selectedIndex + 1;

                $scope.changeTimePerInstanceIndex($scope.selectedIndex);
            }
        };

        $scope.changeTimePerInstanceIndex = function(index) {
            index = index - 1;

            $scope.player.currentTime($scope.instances[index].start / 1000);
            console.log("current index: " + (index - 1));

            // Play segment whenever we change
            $scope.placeToEnd = $scope.instances[index].stop / 1000;
            $scope.player.play();
            $scope.player.on('timeupdate', stopWhenDone);
        };


        // For sorting instances by start time
        function compare(a,b) {
            if (a.start < b.start)
                return -1;
            if (a.start > b.start)
                return 1;
            return 0;
        }
    }
});
