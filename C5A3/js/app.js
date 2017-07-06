(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    NarrowItDownController.inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var list = this;
        list.found = MenuSearchService.getMatchedMenuItems(list.searchTerm);

    }

    MenuSearchService.inject = ['$http', 'ApiBasePath']

    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var foundItems = [];
        var errorMessage = '';
        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                    method: "GET",
                    url: (ApiBasePath + "/menu_items.json"),
                })
                .then(function(response) {
                    // Skip the for loop altogether if the searchTerm is blank
                    if (searchTerm !== "") {
                        for (var i = 0; i < response.data.menu_items.length; i++) {
                            var item = response.data.menu_items[i];
                            if (item.description.toLowerCase().indexOf(searchTerm) !== -1) {
                                var menuItem = {
                                    name: item.name,
                                    short_name: item.short_name,
                                    description: item.description
                                };
                                foundItems.push(menuItem);
                                nothingFound = false;
                            }
                        }
                    }
                    if (foundItems.length == 0) {
                        errorMessage = "Nothing Found!";
                    }
                    return foundItems;
                })
            sevice.getFoundItems = function() {

            }
        };

    }

})();
