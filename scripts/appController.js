(function () {

    'use strict';

    var appController = function ($scope, $location, $timeout, $http) {
        $scope.field = 'approach';
        $scope.hideCooperation = false;
        var bodyWidth = window.document.body.clientWidth;
        $scope.isNarrow = bodyWidth < 460;
        $scope.isPad = bodyWidth >= 460 && bodyWidth < 980;
        $scope.isPadLarge = bodyWidth >= 980 && bodyWidth <= 1280;
        $scope.isFull = bodyWidth > 1280;

        $scope.redirect = function () {
            $('body').removeClass('body--menu-visible').css({ overflowY: 'auto' });
            //$('div[ng-view]').scrollTop();
            // location.reload();
            // $timeout(function () {
            //     $('body').scrollTop();
            // }, 1000);
        };

        $scope.start = function () {
            //var name = 'https://api:key-bf70093a80b9c8f3c3906fb116b86a35@api.mailgun.net/v3/samples.mailgun.org/log';
            var name = 'https://api.emailjs.com/api/v1.0/email/send';
            var data = {
                service_id: 'default_service',
                template_id: 'template_bpajNTD7',
                user_id: 'user_lPAsGCZkyVBNqXm8S7GqL',
                template_params: {
                    'username': 'James',
                    'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...'
                }
            };
            
            $http.post(name, data).then(function () {
                alert('succeed');
            }, function () {
                alert('failed');
            });
        }

        $scope.$watch(function () {
            return $location.search();
        }, function (newValue, oldValue) {
            var location = angular.lowercase($location.$$url);
            if (location) {
                if (location.indexOf('methodology') !== -1) {
                    $scope.hideCooperation = false;
                    $scope.field = 'methodology';
                } else if (location.indexOf('cooperation') !== -1) {
                    $scope.hideCooperation = true;
                }
                else {
                    $scope.hideCooperation = false;
                    $scope.field = 'approach';
                }
            }
        });
    }

    app.controller('appController', ['$scope', '$location', '$timeout', '$http', appController]);
})();
