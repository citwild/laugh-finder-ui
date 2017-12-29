angular.module('laughResearchApp.viewer')

.service('metadataService', ['$http', function($http) {
    return {
        updateInstanceData: function(instanceId, json) {
            return $http.post(
                'https://137.135.51.94/rest/instance/' + instanceId + '/update',
                json
            );
        }
    }
}])

.component('metadataForm', {
    templateUrl: 'app/viewer/instanceList/metadataForm/metadata-form.html',
    controller: function($scope, metadataService) {

        // 0. Sync component before grabbing data
        this.$onInit = function () {

            let tagLabels = [];
            let tagIdMap = {};

            // 1. Set form input for tags
            let instanceTags = new Taggle('instance-tags', {
                placeholder: '',
                allowDuplicates: false,
                duplicateTagClass: 'bounce',
                tags: tagLabels
            });

            // Set auto complete of tags
            let container = instanceTags.getContainer();
            var input = instanceTags.getInput();
            $(input).autocomplete({
                source: tagLabels,
                appendTo: container,
                position: { at: "left bottom", of: container },
                select: function(event, data) {
                    event.preventDefault();
                    // Add the tag if user clicks
                    if (event.which === 1) {
                        instanceTags.add(data.item.value);
                    }
                }
            });

            // 2. Get laugh types from parent if updated
            $scope.$parent.$watch('laughTypes', function () {
                if ($scope.$parent.laughTypes) {
                    $scope.laughTypes = $scope.$parent.laughTypes;

                    $scope.laughTypes.forEach(function(elem) {
                        tagLabels.push(elem.type);
                        tagIdMap[elem.type] = elem.id;
                    });
                }
            });

            // Get video instance data
            $scope.$parent.$watch('video', function () {
                if ($scope.$parent.video) {
                    $scope.instanceTags = $scope.$parent.video
                }
            });

            // 3. Get data from parent scope
            let ctrl = this;
            $scope.instance   = ctrl.instance;
            $scope.laughTypes = ctrl.laughTypes;


            // 4. Define helper functions
            $scope.updateInstanceData = function () {
                // setup list of tags to submit
                let submitTags = [];
                let currTags = instanceTags.getTags().values;
                currTags.forEach(function(elem) {
                    submitTags.push(tagIdMap[elem]);
                });
                
                // establish payload
                let result = {
                    algCorrect: $scope.instance.algCorrect,
                    tags: submitTags
                };

                console.log(result);

                metadataService.updateInstanceData($scope.instance.id, result).then(
                    function success(response) {
                        console.log(response);
                    },
                    function error(response) {
                        console.log(response);
                    }
                );
            };
        }
    },
    bindings: {
        instance: '<',
        laughTypes: '<',
    }
});
