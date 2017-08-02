(function () {
    "use strict";
    angular.module('swApp')
        .controller('listController',
        	['$scope','$location','swHttpService','personDetailService', function ($scope, $location, swHttpService, personDetailService) {

            $scope.rotas = function(){
                $location.path('/details');
            };

           	$scope.currentPage = 0;
           	$scope.numberOfPages = 9;

           	swHttpService.getAllPeople().then(function(response){
            	$scope.peopleList = response.data.results;
            	$scope.nextPage = response.data.next;
            	$scope.previousPage = response.data.previous;
            });

            $scope.searchAllPeople = function(searchParameter){
	        	swHttpService.searchPeople(searchParameter).then(function(response){
	            	$scope.peopleList = response.data.results;
	            });
            }

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

            $scope.getPersonDetails = function(personUrl){

        		personDetailService.addUrl(personUrl);
	            $location.path('/details');
            }

			$scope.sortBy = function (field) {
				$scope.orderWith = field;
				$scope.orderDirection = !$scope.orderDirection;
			};

        }]);
})();