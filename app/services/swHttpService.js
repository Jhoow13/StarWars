(function(){
    'use strict';
    angular.module('swApp')
        .factory('swHttpService', ['$http', function ($http){
            var _getAllPeople = function(){
                return $http({
                    method: 'GET',
                    url: 'http://swapi.co/api/people/'
                });
            };

            return {
                getAllPeople: _getAllPeople
            };
            
        }]);
}());