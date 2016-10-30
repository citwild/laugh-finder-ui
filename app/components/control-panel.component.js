angular
.module('videoViewerApp')
.component('controlPanel', {
    template:
    '<div id="control-panel">' +
        '<div id="playback-control">' +
            '<label>Playback Rate</label>' +
            '<br>' +
            '<input ng-click="changeRate()" type="range" min="-3" max="3" value="1" step="0.05" id="rate-slider" list="rate-ticks">' +
                '<datalist id="rate-ticks">' +
                '<option>-3</option>' +
                '<option>-2.5</option>' +
                '<option>-2</option>' +
                '<option>-1.5</option>' +
                '<option>-1</option>' +
                '<option>-0.5</option>' +
                '<option>0</option>' +
                '<option>0.5</option>' +
                '<option>1</option>' +
                '<option>1.5</option>' +
                '<option>2</option>' +
                '<option>2.5</option>' +
                '<option>3</option>' +
                '</datalist>' +
                '<br>' +
                '<div id="rate-num">1</div>' +
                '<br>' +
                '<button ng-click="playNormally()" id="play-normal">Reset Playback Speed</button>' +
            '</div>' +
            '<br>' +
            '<div id="seek-control">' +
                '<p>Seek by seconds</p>' +
            '<button ng-click="skipBack()">&larr;</button>' +
            '<input id="skip-amt" type="text" size="2" value="10">' +
            '<button ng-click="skipForward()">&rarr;</button>' +
        '</div>' +
    '</div>',

    controller: function ControlPanelController($scope) {
        $scope.goToTime = $scope.$parent.goToTime;

        // playback rate $scope.$parent.(tied to slider)
        $scope.changeRate = $scope.$parent.changeRate;

        $scope.playNormally = $scope.$parent.playNormally;

        $scope.skipBack = $scope.$parent.skipBack;

        $scope.skipForward = $scope.$parent.skipForward;
    }
});