'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/manage-students');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html'
            })
            .state('manage-students', {
                url: '/manage-students',
                templateUrl: 'templates/manage-students.html'
            })
            .state('new-student', {
                    url: '/new-student',
                    templateUrl: 'templates/new-student.html'
            })
            .state('update-student', {
                url: '/update-student',
                templateUrl: 'templates/update-student.html'
            })
            .state('manage-fees', {
                url: '/manage-fees',
                templateUrl: 'templates/manage-fees.html'
            })
            .state('stats', {
                url: '/stats',
                templateUrl: 'templates/stats.html'
            });
    }
]);