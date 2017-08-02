(function() {
    'use strict';    
    angular.module('swApp', ['ngRoute']);
    
})();
(function(){
    'use strict';

    angular.module('swApp').config(['$routeProvider', '$locationProvider',
             function($routeProvider, $locationProvider) {

            $routeProvider            

            .when('/', {
                templateUrl: 'app/views/list.html',
                controller: 'listController'
            })

            .when('/details', {
                templateUrl: 'app/views/details.html',
                controller: 'detailsController'
            })

            .otherwise({redirectTo: '/'});


            $locationProvider.hashPrefix('');

        }]);
})();


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

            $scope.getPersonDetails();

        }]);
})();
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
(function(){
    'use strict';
    angular.module('swApp')
        .service('personDetailService', [function (){

              var personUrl = '';

              var addUrl = function(newUrl) {
                  personUrl = sessionStorage.setItem('url', newUrl) ;
              };

              var getUrl = function(url){
                  return sessionStorage.getItem(url);
              };

              return {
                addUrl: addUrl,
                getUrl: getUrl
              };

        }]);
}());
(function(){
    'use strict';
    angular.module('swApp')
        .factory('swHttpService', ['$http', function ($http){

            var _getAllPeople = function(peopleUrl){
                return $http({
                    method: 'GET',
                    url: peopleUrl ? peopleUrl : 'http://swapi.co/api/people/'
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