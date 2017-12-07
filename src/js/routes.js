'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/login');

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
            .state('dashboard.manage-students', {
                url: '/manage-students',
                parent: 'dashboard',
                templateUrl: 'templates/manage-students.html'
            })
            .state('dashboard.new-student', {
                    url: '/new-student',
                    parent: 'dashboard',
                    templateUrl: 'templates/new-student.html'
            })
            .state('dashboard.update-student', {
                url: '/update-student',
                parent:'dashboard',
                templateUrl: 'templates/update-student.html'
            })
            .state('dashboard.manage-fees', {
                url: '/manage-fees',
                parent:'dashboard',
                templateUrl: 'templates/manage-fees.html'
            })
            .state('dashboard.manage-others', {
                url: '/manage-others',
                parent:'dashboard',
                templateUrl: 'templates/manage-others.html'
            })
            .state('dashboard.stats', {
                url: '/stats',
                parent:'dashboard',
                templateUrl: 'templates/stats.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.view.html'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'templates/dashboard.html'
            });
    }
]);