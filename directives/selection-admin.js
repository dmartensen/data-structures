

angular.module('selection')
	.directive('selectionAdmin', ['TreeFactory',
		function(TreeFactory) {
			return {
				restrict: 'E',
				scope: {},
				templateUrl: 'templates/selection-admin.html',
				link: function($scope, element, attrs) {

                    /**
                    *   save settings button removes parent references, converts
                    *   javascript object to json using toJson(), then resets parent refs.
                    */
                    $scope.saveSettings = function() {

                        var json = null, dataElem = null;

                        TreeFactory.removeParentReferences();
                        
                        json = angular.toJson(_root);

                        dataElem = angular.element(document.getElementById('content'));
                        if(dataElem) {
                            dataElem.val(json);
                            alert('Successfully Saved.  Now click "Save / Publish" on the left side bar.');
                        }

                        TreeFactory.setParentReferences();
                    };

                    /**
                    *   Checks if is not a leaf node in tree.
                    */
                    $scope.isNonLeafNode = function(node) {
                        return node.children.length !== 0;
                    };

               
                    /**
                    *   Event handler delegates to removeNode(),
                    *   then stops propogation to prevent click handlers
                    *   on parents from being invoked.
                    */
                    $scope.removeItem = function(event, node) {

                        TreeFactory.removeNode(node);

                        event.stopPropagation();
                    };

                    /**
                    *   Event handler delegates to addSiblingNode(),
                    *   then stops propogation to prevent click handlers
                    *   on parents from being invoked.
                    */
                    $scope.addSibling = function(event, node) {

                        TreeFactory.addSiblingNode(node);

                        event.stopPropagation();
                    };

                    /**
                    *   Event handler delegates to addChildNode(),
                    *   then stops propogation to prevent click handlers
                    *   on parents from being invoked.
                    */
                    $scope.addChild = function(event, node) {

                        TreeFactory.addChildNode(node);

                        event.stopPropagation();
                    };

				}
			};
		}
	]);
