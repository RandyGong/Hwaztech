(function () {

    'use strict';

    var appController = function ($scope, $location) {
        $scope.field = 'approach';
        var bodyWidth = window.document.body.clientWidth;
        $scope.isNarrow = bodyWidth < 460;
        $scope.isPad = bodyWidth >= 460 && bodyWidth < 1024;
        $scope.isFull = bodyWidth >= 1024;

        $scope.$watch(function () {
            return $location.search();
        }, function (newValue, oldValue) {
            var location = angular.lowercase($location.$$url);
            if (location) {
                if (location.indexOf('methodology') !== -1) {
                    $scope.field = 'methodology';
                } else {
                    $scope.field = 'approach';
                }
            }
        });
    }

    app.controller('appController', ['$scope', '$location', appController]);
})();
