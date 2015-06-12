

app.directive('RotatorDirective', ['AjaxService', 'RotatorFactory',
    function(AjaxService, RotatorFactory) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'items.html',
            link: function($scope, element, attrs) {

                var Rotator_2Col = null,
                    Rotator_3Col = null,

                    URL = 'http://aws.com/getItems/';

                $scope.itemssList2Col = null;
                $scope.itemssLis3Col = null;

                AjaxService.ajaxRequest(URL).then(function(data) {

                    // assigns refined data to list
                    $scope.itemssList2Col = data;

                    // clone array so elements don't refer to same objects
                    $scope.itemsList3Col = $.extend(true, [], data);

                    Rotator_2Col = RotatorFactory($scope.itemssList2Col, 2);
                    Rotator_3Col = RotatorFactory($scope.itemssList3Col, 3);

                });

                
                $scope.rotatorPrevClick = function() {
                    Rotator_2Col.prevClick();
                    Rotator_3Col.prevClick();
                };

                $scope.rotatorNextClick = function() {
                    Rotator_2Col.nextClick();
                    Rotator_3Col.nextClick();
                };

                $scope.isCurrentSlideIndex = function(index) {
                    return Rotator_3Col.getCurrentIndex() === index;
                };
            }
        };
    }
]);