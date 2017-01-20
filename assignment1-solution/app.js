
(function(){
    "use strict";

    angular.module("LunchCheck", [])
        .controller("LunchCheckController", ['$scope', function ($scope) {
            $scope.dishes = "";

            $scope.checkLunch = function () {
                var numOfInput = $scope.dishes.split(',').filter(function (dish) {
                    return dish.trim().length > 0;
                }).length;


                if(numOfInput == 0 ){
                      $scope.status = 'ERROR';
                      $scope.message = "Please enter a value";
                  } else if (numOfInput <= 3 ) {
                      $scope.status = 'OK';
                      $scope.message = "Enjoy!";
                       }
                else {
                      $scope.status = 'OK';
                      $scope.message = "Too much!";
                 }

            }
        }]);
})();
