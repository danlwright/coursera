(function() {
    'use strict';

    angular.module("ShoppingListCheckOff", [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service("ShoppingListCheckOffService", ShoppingListCheckOffService)

    ToBuyController.$inject = ["ShoppingListCheckOffService"];

    function ToBuyController(ShoppingListCheckOffService) {
        var itemAdder = this;

        itemAdder.items = ShoppingListCheckOffService.getItemsToBuy();
        itemAdder.itemsToBuy = function(itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        }

    }

    AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var itemRemover = this;
        itemRemover.items = ShoppingListCheckOffService.getBoughtItems();

    }

    function ShoppingListCheckOffService() {
        var service = this;

        //items to buy
        var itemsToBuy = [
            { name: "pizza", quantity: 2 },
            { name: "hamburger", quantity: 10 },
            { name: "french fries", quantity: 2 },
            { name: "ribeye steak", quantity: 1 },
            { name: "salad", quantity: 1 },
        ];

        //bought items
        var boughtItems = []

        service.getItemsToBuy = function() {
            return itemsToBuy;
        };

        service.getBoughtItems = function() {
            return boughtItems;
        };


        service.buyItem = function(itemIndex) {
            boughtItems.push(itemsToBuy[itemIndex]);
            itemsToBuy.splice(itemIndex, 1);
        }

    }

})();
