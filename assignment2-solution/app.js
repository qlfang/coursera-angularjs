(function() {
  "use strict";

  angular.module("ShoppingListCheckOff", [])
    .controller("ToBuyShoppingController", ToBuyShoppingController)
    .controller("AlreadyBoughtShoppingController", AlreadyBoughtShoppingController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);


  ToBuyShoppingController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyShoppingController(ShoppingListCheckOffService) {
    var list = this;

    list.items = ShoppingListCheckOffService.getItemsToBuy();

    list.checkOff = function(itemIndex) {
      console.log("Checking off item ", itemIndex);
      ShoppingListCheckOffService.checkOff(itemIndex);
    };
  }


  AlreadyBoughtShoppingController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    var list = this;

    list.items = ShoppingListCheckOffService.getItemsBought();
  }


  // ShoppingListCheckOffService.$inject = [];
  function ShoppingListCheckOffService() {
    var service = this;

    var itemsToBuy = [
      { name: "Apple", quantity: 4 },
      { name: "Banana", quantity: 5 },
      { name: "Cherry", quantity: 20 },
      { name: "Date", quantity: 10 },
      { name: "Elderberry", quantity: 20 },
      { name: "Fig", quantity: 10 },
      { name: "Grape", quantity: 15 },
      { name: "Honeydew melon", quantity: 1 },
      { name: "Indian Plum", quantity: 6 },
      { name: "Jackfruit", quantity: 2 }
    ];

    var itemsBought = [];

    service.getItemsToBuy = function () {
      return itemsToBuy;
    };

    service.getItemsBought = function () {
      return itemsBought;
    };

    service.checkOff = function (itemIndex) {
      itemsBought.push(itemsToBuy[itemIndex]);
      itemsToBuy.splice(itemIndex, 1);
    };
  }
})();
