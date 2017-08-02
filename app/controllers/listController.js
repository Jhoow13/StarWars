(function () {
    "use strict";
    angular.module('swApp')
        .controller('listController',
        	['$scope','$location','swHttpService', function ($scope, $location, swHttpService) {

            $scope.rotas = function(){
                $location.path('/details');
            };

            swHttpService.getAllPeople().then(function(response){
            	console.log(response.data);
            });

        }]);
})();