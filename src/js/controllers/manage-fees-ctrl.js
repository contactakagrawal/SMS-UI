angular.module('RDash')
    .controller('ManageFeesCtrl', ['$scope', '$cookieStore', '$http', '$state', 'localStorageService','urlPrefix','Student', ManageFeesCtrl]);


function ManageFeesCtrl($scope, $cookieStore, $http, $state, localStorageService, urlPrefix, Student){

    $scope.student = localStorageService.get('selected-student');

    $scope.update = function(){

        var student = new Student($scope.student);
        student.evalTotalFeesExpectedAndPending();

        var postBody = {
            _id: student._id,
            updatedContent: {
                feesArray: student.feesArray,
                totalFeesPending: student.totalFeesPending,
                totalFeesExpected: student.totalFeesExpected
            }

        };

        // update the fees section in db
        $http.post(urlPrefix + '/app/student/update',postBody).then(function(response){
            toastr.info('Fees Details updated successfully!!!');
        }).catch(function(err){
            toastr.error('Error while updating the fees');
        });

    };

    $scope.backToManageStudent = function(){
        $state.go('manage-students');
    };


}