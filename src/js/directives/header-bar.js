angular
    .module('RDash')
    .directive('headerBar', headerBar);

function headerBar() {
    var directive = {
        restrict: 'E',
        templateUrl: '../templates/header-bar.html'
    };
    return directive;
};