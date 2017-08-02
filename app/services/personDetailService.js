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