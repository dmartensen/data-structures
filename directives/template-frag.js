angular.module('selection')
	.directive('templateFrag',
		function() {
			return {
				restrict: 'A',
				scope: {},
				templateUrl: 'templates/selection-admin.html'
			};
		}
	);