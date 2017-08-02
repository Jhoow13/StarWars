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

            var _getPerson = function(personUrl){
                return $http({
                    method: 'GET',
                    url: personUrl
                });
            }

            var _getPlanet = function(planetUrl){
                return $http({
                    method:'GET',
                    url: planetUrl
                });
            }

            return {
                getAllPeople: _getAllPeople,
                getPerson: _getPerson,
                getPlanet: _getPlanet
            };
            
        }]);
}());