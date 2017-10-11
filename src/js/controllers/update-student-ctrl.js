angular.module('RDash')
    .controller('UpdateStudentCtrl', ['$scope', 'urlPrefix', '$http', '$state', 'localStorageService','Student', UpdateStudentCtrl]);


function UpdateStudentCtrl($scope, urlPrefix, $http, $state, localStorageService, Student){

    $scope.student = localStorageService.get('student-to-be-updated');

    // convert string to date
    $scope.student.doa = ($scope.student.doa)?new Date($scope.student.doa):$scope.student.doa;
    $scope.student.dob = ($scope.student.dob)?new Date($scope.student.dob):$scope.student.dob;

    $scope.relationTypes = ['Father', 'Mother', 'Brother', 'Sister', 'Uncle'];

    $scope.backToManageStudent = function(){
        $state.go('manage-students');
    };

    $scope.dobDatePickerPopup = {
        opened: false
    };

    $scope.openDobDatePicker = function() {
        $scope.dobDatePickerPopup.opened = true;
    };

    $scope.doaDatePickerPopup = {
        opened: false
    };

    $scope.openDoaDatePicker = function() {
        $scope.doaDatePickerPopup.opened = true;
    };

    $scope.updateStudent = function(){

        var student = new Student($scope.student);

        student.initFeesThisMonthInFeesArray();
        student.evalTotalFeesExpectedAndPending();

        var postBody = {
            collectionName: 'students',
            updateCriteria: {
                _id: student._id
            },
            newPayLoad: student
        };

        $http.post(urlPrefix + '/app/save', postBody).then(function(res){
            toastr.info('Student Information Updated Successfully!!!');
        }).catch(function(err){
            toastr.error('Error While updating student');
        });

    }
}