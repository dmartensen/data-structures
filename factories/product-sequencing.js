    
app.directive('fruitDirective', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {

            var guavaID = readguavaID();

            // get list of bananas, 1st call.
            getbananaList()
            .then(function(data) {
                // assign data to banana options list
                $scope.bananaOptionList = data && data;

                if(guavaID !== null) {
                    // get guava data based on guavaID, 3rd call.
                    return getguavaData(guavaID);
                } else {
                    // set to first option
                    $scope.bananaSelected = $scope.bananaOptionList[0];
                    return false;
                }
            })
            .then(function(data) {
                // returns list of guavas
                
                var bananaName = data && data[0].bananaName,
                    bananaID = null;

                $scope.bananaSelected = '';

                // using banana name, find banana id
                $scope.bananaOptionList.some(function(elem) {
                    if(elem.name === bananaName) {
                        $scope.bananaSelected = elem;
                        bananaID = elem.id;
                        return true;
                    } else {
                        return false;
                    }
                });
                
                // 2nd call, get guava options
                return getguavaList(bananaID);
            })
            .then(function(data) {
                // returns one guava data
                $scope.guavaSelected = '';

                $scope.guavaOptionList = data && data;

                // find selected guava based on guavaid
                $scope.guavaOptionList.some(function(elem, index) {
                    if(guavaID === elem.id) {
                        $scope.guavaSelected = elem;
                        return true;
                    } else {
                        return false;
                    }
                });
            });
        }
    };
});