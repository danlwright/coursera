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
            if (menuItemsLength < 4 && menuItemsLength != 1) {
                $scope.response = "Enjoy!";
            }
            else if (menuItemsLength == 1) {
                $scope.response = "Please enter data first";
            } else {
                $scope.response = "Too Much!";
            }
        };
    }

})();
