angular.module('laughResearchApp.viewer')

.component('metadataForm', {
    templateUrl: 'app/viewer/instanceList/metadataForm/metadata-form.html',
    controller: function MetadataFormController($scope) {
        // maybe some logic to POST to web service

        $scope.hideSpeakerField = true;

        $scope.disableSpeakerField = function (bool) {
            document.getElementById('speaker').disabled = bool;
            $scope.hideSpeakerField = bool;
        }
    }
});
