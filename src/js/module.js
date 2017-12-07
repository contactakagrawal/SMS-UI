angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngCookies', 'LocalStorageModule', 'angular-loading-bar', 'chart.js', 'ngFileUpload']);
//http://localhost:3000
angular.module('RDash').value('urlPrefix', 'http://localhost:3000');
angular.module('RDash').config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setStorageType('sessionStorage');
});