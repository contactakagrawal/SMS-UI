/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$cookieStore', 'localStorageService','$filter', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, localStorageService,$filter) {

    var sessionStartDate = new Date('03/01/2017');
    var sessionEndDate = new Date('02/28/2018');

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'];

    var sessionStartMonth = $filter('date')(sessionStartDate, 'MMMM');
    var sessionStartYear = $filter('date')(sessionStartDate, 'yyyy');

    var sessionStartIndex = months.indexOf(sessionStartMonth);

    function getFeesArray(){
        var feesArray = [];
        var count = 1;
        var feesYear = sessionStartYear;
        for(var i=sessionStartIndex;count <= 12; i = (i+1)%12){
            count++;
            if(i===0 && feesArray.length > 0){
                feesYear++;
            }
            feesArray.push({
                month: months[i],
                year: feesYear,
                feesThisMonth: 0,
                deposit: 0
            })
        }
        return feesArray;
    }

    var feesArray = getFeesArray();
    localStorageService.set('feesArray', feesArray);

    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
}