/**
 * Loading Directive
 * @see http://tobiasahlin.com/spinkit/
 */

angular
    .module('RDash')
    .directive('sideBar', sideBar);

function sideBar() {
    var directive = {
        restrict: 'E',
        templateUrl: '../templates/side-bar.html'
    };
    return directive;
};