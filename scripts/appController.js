(function () {

    'use strict';

    var appController = function ($scope, $location, $timeout) {
        $scope.field = 'approach';
        var bodyWidth = window.document.body.clientWidth;
        $scope.isNarrow = bodyWidth < 460;
        $scope.isPad = bodyWidth >= 460 && bodyWidth < 980;
        $scope.isPadLarge = bodyWidth >= 980 && bodyWidth <= 1280;
        $scope.isFull = bodyWidth > 1280;

        $scope.redirect = function () {
            $('body').removeClass('body--menu-visible').css({overflowY: 'auto'});
            //$('div[ng-view]').scrollTop();
            // location.reload();
            // $timeout(function () {
            //     $('body').scrollTop();
            // }, 1000);
        };

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

    app.controller('appController', ['$scope', '$location', '$timeout', appController]);
})();
