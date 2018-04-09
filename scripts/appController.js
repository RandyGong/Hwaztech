(function () {

    'use strict';

    var appController = function ($scope, $location, $timeout, $http, $window) {
        $scope.field = 'approach';
        $scope.hideCooperation = false;
        $scope.introExpand = false;
        $scope.name = '';
        $scope.company = '';
        $scope.email = '';
        $scope.details = '';
        $scope.isOperating = false;
        $scope.successHeight = 0;
        $scope.successPaddingTop = 0;
        $scope.startCooperationPaddingTop = 0;
        onResize();

        $scope.expandIntro = function () {
            $scope.introExpand = !$scope.introExpand;

            if (!$scope.introExpand) {
                $window.scrollTo(0, 520);
            }
        };

        $scope.redirect = function () {

            $('body').removeClass('body--menu-visible').css({ overflowY: 'auto' });
            //$('div[ng-view]').scrollTop();
            // location.reload();
            // $timeout(function () {
            //     $('body').scrollTop();
            // }, 1000);

        };

        var w = angular.element($window);
        w.bind('resize', function () {
            onResize();
        })

        $scope.start = function () {
            if (!$scope.name || !$scope.email || !$scope.details) {
                return;
            }

            //var name = 'https://api:key-bf70093a80b9c8f3c3906fb116b86a35@api.mailgun.net/v3/samples.mailgun.org/log';
            var name = 'https://api.emailjs.com/api/v1.0/email/send';
            var data = {
                service_id: 'mailgun',
                template_id: 'new_lead',
                user_id: 'user_lPAsGCZkyVBNqXm8S7GqL',
                template_params: {
                    'from_name': $scope.name,
                    'company': $scope.company,
                    'email': $scope.email,
                    'details': $scope.details
                }
            };
            $scope.isOperating = true;

            $http.post(name, data).then(function () {
                $scope.isOperating = false;
                $location.path("submit-success");
            }, function () {
                alert('Oops, an error occured while processing your request, please try again.');
                $scope.isOperating = false;
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
                } else if (location.indexOf('cooperation') !== -1
                    || location.indexOf('submit-success') !== -1
                    || location.indexOf('join-us') !== -1) {
                    $scope.hideCooperation = true;

                    $scope.successHeight = ($window.innerHeight - 85 - 181) + 'px';
                    $scope.successPaddingTop = (($window.innerHeight - 85 - 181 - 67 - 29) / 2) + 'px';
                    $scope.startCooperationPaddingTop = (($window.innerHeight - 85 - 181 - 343 - 33 - 59) / 2) + 'px';
                }
                else {
                    $scope.hideCooperation = false;
                    $scope.field = 'approach';
                }
            }
        });

        function onResize() {
            var bodyWidth = window.document.body.clientWidth;
            $scope.isNarrow = bodyWidth < 460;
            $scope.isPad = bodyWidth >= 460 && bodyWidth < 980;
            $scope.isPadLarge = bodyWidth >= 980 && bodyWidth <= 1280;
            $scope.isFull = bodyWidth > 1280 && bodyWidth <= 1600;
            $scope.isFullLarge = bodyWidth > 1600;
        }
    }

    app.controller('appController', ['$scope', '$location', '$timeout', '$http', '$window', appController]);
})();
