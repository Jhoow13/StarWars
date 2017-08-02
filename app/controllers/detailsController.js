(function () {
    "use strict";
    angular.module('swApp')
        .controller('detailsController', 
        	['$scope','$location', 'swHttpService', 'personDetailService', function ($scope,$location, swHttpService, personDetailService) {
            
            $scope.rotas = function(){
                $location.path('/');
            };

            var teste = personDetailService.getProducts('url');
            $scope.residents = [];

            $scope.getPersonDetails = function(){
            	swHttpService.getPerson(teste).then(function(response){            		
            		getPlanet(response.data.homeworld);
            		$scope.personDetails = response.data;
	            });	            
            }

            var getPlanet = function(planetUrl){
            	swHttpService.getPlanet(planetUrl).then(function(response){
            		$scope.personPlanet = response.data.name;
            		var residents = response.data.residents;            

            		residents.forEach(function(residentsUrl){
            			swHttpService.getPerson(residentsUrl).then(function(response){            			        		
			        		$scope.residents.push({
			        			name: response.data.name
			        		});
			            });	    
            		});
            		
            	})
            }

            $scope.getPersonDetails();

        }]);
})();