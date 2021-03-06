'use strict';

var app = angular.module('hwaztechApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: 'view/main.html' })
        .when('/developers', { templateUrl: 'view/developers.html' })
        .when('/case-studies', { templateUrl: 'view/case-studies.html' })
        .when('/methodology', { templateUrl: 'view/methodology.html' })
        .when('/engagement-model', { templateUrl: 'view/engagement-model.html' })
        .when('/start-cooperation', { templateUrl: 'view/start-cooperation.html' })
        .when('/join-us', { templateUrl: 'view/join-us.html' })
        .when('/submit-success', { templateUrl: 'view/submit-success.html' })
        .otherwise({ redirectTo: '/' });
}]);