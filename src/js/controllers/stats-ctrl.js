angular.module('RDash')
    .controller('StatsController', ['$scope', '$http', 'urlPrefix', 'localStorageService', StatsController]);


function StatsController($scope, $http, urlPrefix, localStorageService){

    $scope.labels = ["Total Fees Pending", "Total Fees Collected"];
    $scope.data = [300, 500];

    // update the stats
    $http.get(urlPrefix + '/app/student/stats').then(function(response){
        $scope.stats = response.data[0];
    }).catch(function(err){
        toastr.error('Error while updating the fees');
    });

}