(function () {

    'use strict';

    var appController = function ($scope, $location) {     
        $scope.field = 'approach'; 
        
        $scope.$watch(function () {
            return $location.search();
        }, function (newValue, oldValue) {            
            var location = angular.lowercase($location.$$url);            
            if (location) {
                if (location.indexOf('methodology') !== -1) {
                    $scope.field = 'methodology'; 
                }else {
                    $scope.field = 'approach'; 
                }
            }
        });
    }

    app.controller('appController', ['$scope', '$location', appController]);
})();
