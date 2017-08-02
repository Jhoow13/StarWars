(function () {
    "use strict";
    angular.module('swApp')
    .directive('cabecalhoDirective', [function () {
        return {
            restrict: 'AE',
            scope: {
                titulo: '@'
            },
            templateUrl: 'app/directives/cabecalhoDirective/cabecalhoDirective.html'            
        };
    }]);
})();