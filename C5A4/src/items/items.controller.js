// Create items.component.js file and create a component called items 
// that shows all of the menu items for a particular category.

// The categories and the items components should NOT directly use the MenuDataService to fetch their own data. Instead, the proper data should be simply passed into the component. (Hint: use the one-way < binding).

(function () {
'use strict';

 angular.module('MenuApp')
     .controller('CategoryItemsController', CategoryItemsController);

CategoryItemsController.$inject = ['categoryItems'];
function CategoryItemsController(categoryItems) {
    console.log('category');
    console.log(categoryItems);
    console.log(categoryItems.menu_items[0].name);
    var ctrl = this;
    ctrl.categoryItems = categoryItems;
}

})();