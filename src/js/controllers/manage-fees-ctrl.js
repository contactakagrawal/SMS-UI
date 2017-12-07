angular.module('RDash')
    .controller('ManageFeesCtrl', ['$scope', '$cookieStore', '$http', '$state', 'localStorageService','urlPrefix','Student', ManageFeesCtrl]);


function ManageFeesCtrl($scope, $cookieStore, $http, $state, localStorageService, urlPrefix, Student){

    let manageFeesCtrl = this;

    manageFeesCtrl.student = localStorageService.get('selected-student');
    //$scope.student = new Student($scope.student);

    manageFeesCtrl.update = function(){

        manageFeesCtrl.student = new Student(manageFeesCtrl.student);
        manageFeesCtrl.student.evalTotalFeesExpectedAndPending();

        let postBody = {
            _id: manageFeesCtrl.student._id,
            updatedContent: {
                feesArray: manageFeesCtrl.student.feesArray,
                totalFeesPending: manageFeesCtrl.student.totalFeesPending,
                totalFeesExpected: manageFeesCtrl.student.totalFeesExpected
            }

        };

        // update the fees section in db
        $http.post(urlPrefix + '/app/student/update',postBody).then(function(response){
            toastr.info('Fees Details updated successfully!!!');
        }).catch(function(err){
            toastr.error('Error while updating the fees');
        });

    };

    manageFeesCtrl.backToManageStudent = function(){
        $state.go('dashboard.manage-students');
    };


}