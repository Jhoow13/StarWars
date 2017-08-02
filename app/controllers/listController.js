(function () {
    "use strict";
    angular.module('swApp')
        .controller('listController',
        	['$scope','$location','swHttpService', function ($scope, $location, swHttpService) {

            $scope.rotas = function(){
                $location.path('/details');
            };

            swHttpService.getAllPeople().then(function(response){
            	$scope.peopleList = response.data.results;

            	console.log(response.data);

            	$scope.peopleList.forEach(function(person){
            		getPlanet(person.homeworld);

            		getPersonDetails(person.url);
            	});
            });

            var getPersonDetails = function(personUrl){
            	swHttpService.getPerson(personUrl).then(function(response){

	            });
            }

            var getPlanet = function(planetUrl){
            	swHttpService.getPlanet(planetUrl).then(function(response){

	            });
            }

        }]);
})();