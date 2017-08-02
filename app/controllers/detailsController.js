(function () {
    "use strict";
    angular.module('swApp')
        .controller('detailsController', ['$scope','$location', function ($scope,$location) {
            
            $scope.rotas = function(){
                $location.path('/');
            };

        }]);
})();