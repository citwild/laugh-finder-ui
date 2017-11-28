angular.module('laughResearchApp.viewer')

.filter('hmsTime', function(){
    return function (s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        if (secs < 10) secs = '0' + secs;
        if (mins < 10) mins = '0' + mins;
        if (hrs  < 10) hrs  = '0' + hrs;

        return hrs + ':' + mins + ':' + secs;
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

        let videoPlayer = $scope.$parent.player;

        // 1. Watch for changes in parent scope
        $scope.$parent.$watch('video', function () {
            if ($scope.$parent.video) {
                $scope.videoId = $scope.$parent.video.foundLaughters.videoId;
                $scope.instances = $scope.$parent.video.foundLaughters.instances;
            }
        });
        $scope.$parent.$watch('laughTypes', function () {
            if ($scope.$parent.laughTypes) {
                $scope.laughTypes= $scope.$parent.laughTypes;
            }
        });

        // 2. Begin helper methods

        // For "Go There" buttons for instances
        $scope.goToTime = function (start, end) {
            videoPlayer.currentTime(start);

            // This conditional will automatically play the segment IF the
            //   the video is paused
            if (videoPlayer.paused()) {
                videoPlayer.play();

                videoPlayer.on('timeupdate', function () {
                    if (videoPlayer.currentTime() > end) {
                        videoPlayer.pause();
                        videoPlayer.off('timeupdate');
                    }
                });
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
        };

        // Hide instance unless it's the one currently selected
        $scope.selectedIndex = 1;
        $scope.showInstance = function(instanceIndex) {
            return $scope.selectedIndex - 1 === instanceIndex;
        };
        $scope.decrementIndex = function() {
            if ($scope.selectedIndex > 0) {
                $scope.selectedIndex--;
            }
        };
        $scope.incrementIndex = function() {
            if ($scope.selectedIndex < $scope.instances.length) {
                $scope.selectedIndex++;
            }
        };
    }
});
