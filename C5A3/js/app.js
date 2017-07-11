(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'found.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'controller',
            bindToController: true
        }

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var controller = this;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;

        ctrl.getMatchedMenuItems = function(searchTerm) {
            MenuSearchService.getMatchedMenuItems(searchTerm)
                .then(function(result) {
                    ctrl.found = result;
                });
        }

        ctrl.removeItem = function(index) {
            ctrl.found.splice(index, 1);
        }
    }
    // NarrowItDownController.$inject = ['MenuSearchService'];

    // function NarrowItDownController(MenuSearchService) {
    //     var controller = this;
    //     controller.searchTerm = "";

    //     controller.getMatchedMenuItems = function(term) {
    //         if (!term) {
    //             controller.message = "No Items Found";
    //             return false;
    //         } else {
    //             controller.message = false;
    //             var promise = MenuSearchService.getMatchedMenuItems();
    //             promise.then(function(foundItems) {
    //                     var foundArray = [];
    //                     var found = foundItems.data.menu_items;
    //                     for (var i = 0; i < found.length; i++) {
    //                         if (((found[i]).description).indexOf(term) === -1 || ((found[i]).description) === '') {
    //                             found.splice(i, 1);
    //                         } else {
    //                             foundArray.push(found[i]);
    //                         }
    //                     }
    //                     controller.foundItems = foundArray;
    //                 })
    //                 .catch(function(error) {
    //                     console.log(error);
    //                 })
    //         }
    //     };

    //     controller.removeItem = function(itemIndex) {
    //         controller.foundItems.splice(itemIndex, 1);
    //         if (!controller.foundItems.length) {
    //             controller.message = "No Items Found";
    //         } else {
    //             controller.message = false;
    //         }
    //     }

    // }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                    method: 'GET',
                    url: (ApiBasePath + '/menu_items.json')
                })
                .then(function(result) {
                    var items = result.data.menu_items;
                    var foundItems = [];

                    if (!searchTerm)
                        return foundItems;

                    for (var i = 0; i < items.length; i++) {
                        if (items[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
                            foundItems.push(items[i]);
                        }
                    }
                    return foundItems;
                })
                .catch(function(error) {
                    return error.data;
                });
        };
    }

    // MenuSearchService.inject = ['$http', 'ApiBasePath']

    // function MenuSearchService($http, ApiBasePath) {
    //     var service = this;
    //     service.getMatchedMenuItems = function() {
    //         var response = $http({
    //             method: 'GET',
    //             url: (ApiBasePath + '/menu_items.json')
    //         });
    //         response = response.toLowerCase();
    //         return response;

    //     };


    // }

})();
