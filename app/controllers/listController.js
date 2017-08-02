(function () {
    "use strict";
    angular.module('swApp')
        .controller('listController',
        	['$scope','$location','swHttpService', function ($scope, $location, swHttpService) {

            $scope.rotas = function(){
                $location.path('/details');
            };

           	$scope.currentPage = 0;
           	$scope.numberOfPages = 9;

           	swHttpService.getAllPeople().then(function(response){
            	$scope.peopleList = response.data.results;
            	$scope.nextPage = response.data.next;
            	$scope.previousPage = response.data.previous;

            	console.log(response.data);

            });

            $scope.getAllPeopleNextPage = function(peopleUrl){
            	swHttpService.getAllPeople(peopleUrl).then(function(response){
            		$scope.currentPage = $scope.currentPage + 1;
            		$scope.previousPage = response.data.previous;
            		$scope.nextPage = response.data.next;
	            	$scope.peopleList = response.data.results;
	            });
            }

            $scope.getAllPeoplePreviousPage = function(peopleUrl){
            	swHttpService.getAllPeople(peopleUrl).then(function(response){
            		$scope.currentPage = $scope.currentPage - 1;
            		$scope.previousPage = response.data.previous;
            		$scope.nextPage = response.data.next;
	            	$scope.peopleList = response.data.results;
	            });
            }

            var getPersonDetails = function(personUrl){
            	swHttpService.getPerson(personUrl).then(function(response){

	            });
            }

            var getPlanet = function(planetUrl){
            	swHttpService.getPlanet(planetUrl).then(function(response){

	            });
            }

			$scope.sortBy = function (field) {
				$scope.orderWith = field;
				$scope.orderDirection = !$scope.orderDirection;
			};

        }]);
})();