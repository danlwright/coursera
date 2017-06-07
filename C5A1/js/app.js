(function() {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope, $filter) {
        $scope.menuItems = "";
        $scope.response = "";
        $scope.sayMessage = function() {
            var menuItemsString = $scope.menuItems.split(',');
            var menuItemsLength = menuItemsString.length;
            if (menuItemsLength < 4) && (menuItemsLength != 0) {
                $scope.response = "Enjoy!";
            }
            else if (menuItemsLength == 0) {
                $scope.response = "Please enter data first";
            } else {
                $scope.response = "Too Much!";
            }
        };
    }

})();
