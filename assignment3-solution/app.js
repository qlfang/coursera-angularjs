(function (){

'use strict';

var app = angular.module("NarrowItDownApp", []);

app.controller("NarrowItDownController", NarrowItDownController);
app.service("MenuSearchService", MenuSearchService);
app.directive('foundItems', FoundItemsDirective);
NarrowItDownController.$inject = ['MenuSearchService'];
MenuSearchService.$inject = ['$http','$q'];



function FoundItemsDirective(){
  var ddo = {
         restrict: 'E',
        templateUrl: 'loader/itemsloaderindicator.template.html',
        scope: {
                foundItems: '<',
                onRemove: '&'
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'List',
        bindToController: true

  }

  return ddo;
}

function FoundItemsDirectiveController() {
  var List = this;
}

function NarrowItDownController(MenuSearchService){
	var menu = this;
  menu.dataNotFound = false;
  menu.displayMenu = false;
  menu.found;
  menu.search = function(){
    var searchStr = menu.searchStr;

    if(searchStr == ""){
        menu.found = [];
        menu.dataNotFound = true;
        menu.displayMenu = false;
        return;
    }

    var promise = MenuSearchService.getMatchedMenuItems(searchStr);
    promise.then(function (response) {
      menu.found = response.data;
      if(menu.found.length == 0){
        menu.dataNotFound = true;
         menu.displayMenu = false;
      }else{
        menu.dataNotFound = false;
         menu.displayMenu = true;
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  menu.removeItem = function(index){
      menu.found.splice(index, 1);

  };

};

function MenuSearchService($http, $q){
	var service = this;



	service.getMatchedMenuItems = function (searchTerm){
      var deferred = $q.defer();
	 		$http({
  						method: "GET",
      					url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
    				}).then(function(response){
    						var menuArr = response.data.menu_items;
                var found = [];
                for (var i = 0; i < menuArr.length; i++ ) {
                      if(menuArr[i].description.toLowerCase().indexOf(searchTerm) !== -1){
                          found.push(menuArr[i]);
                      }

                };
                response.data = found
                deferred.resolve(response);

    				},function(error){
                deferred.reject(error);
    				});

            return deferred.promise;


	}
}

})();
