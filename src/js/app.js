!function(){"use strict";angular.module("swApp",["ngRoute"])}(),function(){"use strict";angular.module("swApp").config(["$routeProvider","$locationProvider",function(e,t){e.when("/",{templateUrl:"app/views/list.html",controller:"listController"}).when("/details",{templateUrl:"app/views/details.html",controller:"detailsController"}).otherwise({redirectTo:"/"}),t.hashPrefix("")}])}(),function(){"use strict";angular.module("swApp").controller("detailsController",["$scope","$location","swHttpService","personDetailService",function(e,t,n,r){e.rotas=function(){t.path("/")};var o=r.getUrl("url");e.getPersonDetails=function(){n.getPerson(o).then(function(t){a(t.data.homeworld),e.personDetails=t.data})},e.getPersonDetailsFromPlanetList=function(t){o=r.addUrl(t),n.getPerson(t).then(function(t){a(t.data.homeworld),e.personDetails=t.data})};var a=function(t){n.getPlanet(t).then(function(t){e.personPlanet=t.data.name,e.residents=[],t.data.residents.forEach(function(t){n.getPerson(t).then(function(t){e.residents.push({name:t.data.name,url:t.data.url})})})})};e.getPersonDetails()}])}(),function(){"use strict";angular.module("swApp").controller("listController",["$scope","$location","swHttpService","personDetailService",function(e,t,n,r){e.rotas=function(){t.path("/details")},e.currentPage=0,e.numberOfPages=9,n.getAllPeople().then(function(t){e.peopleList=t.data.results,e.nextPage=t.data.next,e.previousPage=t.data.previous}),e.searchAllPeople=function(t){n.searchPeople(t).then(function(t){e.peopleList=t.data.results})},e.getAllPeopleNextPage=function(t){n.getAllPeople(t).then(function(t){e.currentPage=e.currentPage+1,e.previousPage=t.data.previous,e.nextPage=t.data.next,e.peopleList=t.data.results})},e.getAllPeoplePreviousPage=function(t){n.getAllPeople(t).then(function(t){e.currentPage=e.currentPage-1,e.previousPage=t.data.previous,e.nextPage=t.data.next,e.peopleList=t.data.results})},e.getPersonDetails=function(e){r.addUrl(e),t.path("/details")},e.sortBy=function(t){e.orderWith=t,e.orderDirection=!e.orderDirection}}])}(),function(){"use strict";angular.module("swApp").service("personDetailService",[function(){var e="";return{addUrl:function(t){e=sessionStorage.setItem("url",t)},getUrl:function(e){return sessionStorage.getItem(e)}}}])}(),function(){"use strict";angular.module("swApp").factory("swHttpService",["$http",function(e){return{getAllPeople:function(t){return e({method:"GET",url:t||"http://swapi.co/api/people/"})},searchPeople:function(t){return e({method:"GET",url:"https://swapi.co/api/people/?search="+t})},getPerson:function(t){return e({method:"GET",url:t})},getPlanet:function(t){return e({method:"GET",url:t})}}}])}();