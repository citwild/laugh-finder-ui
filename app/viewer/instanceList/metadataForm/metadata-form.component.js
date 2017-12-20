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

            let laughTypeLabels = [];

            // Get laugh types from parent if updated
            $scope.$parent.$watch('laughTypes', function () {
                if ($scope.$parent.laughTypes) {
                    $scope.laughTypes = $scope.$parent.laughTypes;

                    $scope.laughTypes.forEach(function(elem) {
                        laughTypeLabels.push(elem.type);
                    });
                }
            });


            // 1. Get data from parent scope
            let ctrl = this;
            console.log(ctrl.instance);
            console.log(ctrl.laughTypes);
            $scope.instance = ctrl.instance;
            $scope.laughTypes = ctrl.laughTypes;


            // 2. Set form input for tags
            let instanceTags = new Taggle('instance-tags', {
                placeholder: '',
                allowDuplicates: false,
                duplicateTagClass: 'bounce'
            });

            // 2.a. Set auto complete of tags
			let container = instanceTags.getContainer();
			var input = instanceTags.getInput();
			$(input).autocomplete({
				source: laughTypeLabels, // See jQuery UI documentaton for options
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


            // 2. Define helper functions
            $scope.updateInstanceData = function () {
                let result = {
                    joke: $scope.instance.joke,
                    speaker: $scope.instance.speaker,
                    algCorrect: $scope.instance.algCorrect
                };

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
