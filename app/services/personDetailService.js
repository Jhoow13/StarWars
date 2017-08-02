(function(){
    'use strict';
    angular.module('swApp')
        .service('personDetailService', [function (){

              var personUrl = '';

              var addProduct = function(newUrl) {
                  personUrl = sessionStorage.setItem('url', newUrl) ;
              };

              var getProducts = function(url){
                  return sessionStorage.getItem(url);
              };

              return {
                addProduct: addProduct,
                getProducts: getProducts
              };

        }]);
}());