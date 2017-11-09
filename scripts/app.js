'use strict';

var app = angular.module('hwaztechApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: 'view/main.html' })
        .when('/developers', { templateUrl: 'view/developers.html', })
        .when('/printers', { template: '这是打印机页面' })
        .otherwise({ redirectTo: '/' });
}]);