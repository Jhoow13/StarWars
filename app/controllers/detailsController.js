(function () {
    "use strict";
    angular.module('swApp')
        .controller('detailsController',
        	['$scope','$location', 'swHttpService', 'personDetailService', function ($scope,$location, swHttpService, personDetailService) {

            $scope.rotas = function(){
                $location.path('/');
            };

            var personUrl = personDetailService.getUrl('url');


            $scope.getPersonDetails = function(){
            	swHttpService.getPerson(personUrl).then(function(response){
            		getPlanet(response.data.homeworld);
            		$scope.personDetails = response.data;
	            });
            }

            $scope.getPersonDetailsFromPlanetList = function(personUrlFromPlanetList){
            	personUrl = personDetailService.addUrl(personUrlFromPlanetList);
            	swHttpService.getPerson(personUrlFromPlanetList).then(function(response){
            		getPlanet(response.data.homeworld);
            		$scope.personDetails = response.data;
	            });
            }

            var getPlanet = function(planetUrl){
            	swHttpService.getPlanet(planetUrl).then(function(response){
            		$scope.personPlanet = response.data.name;
            		$scope.residents = [];
            		var residents = response.data.residents;

            		residents.forEach(function(residentsUrl){
            			swHttpService.getPerson(residentsUrl).then(function(response){
			        		$scope.residents.push({
			        			name: response.data.name,
			        			url: response.data.url
			        		});
			            });
            		});
            	})
            }

            $scope.sortBy = function (field) {
                $scope.orderWith = field;
                $scope.orderDirection = !$scope.orderDirection;
            };

            $scope.getPersonDetails();

        }]);
})();