(function(){
    'use strict';
    angular.module('swApp')
        .factory('swHttpService', ['$http', function ($http){

            var _getAllPeople = function(peopleUrl){
                return $http({
                    method: 'GET',
                    url: peopleUrl ? peopleUrl : 'https://swapi.co/api/people/'
                });
            };

            var _searchPeople = function(searchParameter){
                return $http({
                    method: 'GET',
                    url: 'https://swapi.co/api/people/?search=' + searchParameter
               });
            }

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
                searchPeople: _searchPeople,
                getPerson: _getPerson,
                getPlanet: _getPlanet
            };
            
        }]);
}());