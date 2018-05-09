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
            var body = document.getElementsByTagName('body')[0];
            removeClass(body, 'body--menu-visible');
            body.style.overflowY = 'auto';
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
                $location.path("submit-success");
                $scope.isOperating = false;
            }, function () {
                alert('Oops, an error occured while processing your request, please send us an email to describe your requirements, thanks!');
                $scope.isOperating = false;
                var mailto = document.getElementById('mailto');
                var mailBody = "My Name: " + $scope.name + "%0a%0dMy Company: " + $scope.company + "%0a%0dMy Email Address: " + $scope.email + "%0a%0dMy Requirements: " + $scope.details;
                mailto.href = "mailto:consultant@hwaztech.com?subject=New Business Request&body=" + mailBody;
                mailto.click();
            });
        }

        $scope.joinUs = function() {
            if (!$scope.name || !$scope.skillset || !$scope.years || !$scope.email) {
                return;
            }
            var mailto = document.getElementById('mailto');
            var mailBody = "My Name: " + $scope.name + "%0a%0dMy Skillset: " + $scope.skillset + "%0a%0dMy Experiences: " + $scope.years + " years%0a%0dMy Email Address: " + $scope.email + "%0a%0dI heard Hwaztech from: " + $scope.heardFrom;
            mailto.href = "mailto:consultant@hwaztech.com?subject=I Want To Join Hwaztech!&body=" + mailBody;
            mailto.click();
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

        function hasClass(obj, cls) {
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }

        function addClass(obj, cls) {
            if (!this.hasClass(obj, cls)) {
                obj.className += " " + cls;
            }
        }

        function removeClass(obj, cls) {
            if (hasClass(obj, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                obj.className = obj.className.replace(reg, ' ');
            }
        }
    }

    app.controller('appController', ['$scope', '$location', '$timeout', '$http', '$window', appController]);
})();
