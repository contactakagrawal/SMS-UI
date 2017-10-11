angular.module('RDash')
    .controller('NewStudentsCtrl', ['$scope', 'urlPrefix', '$http', '$state', 'localStorageService','Student', NewStudentsCtrl]);


function NewStudentsCtrl($scope, urlPrefix, $http, $state, localStorageService, Student){

    $scope.student = {};
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

    $scope.addNewStudent = function(){
        if(!validate($scope.student)){
            return;
        }

        // create new Student
        var student  = new Student($scope.student);
        student.initFeesThisMonthInFeesArray();
        student.evalTotalFeesExpectedAndPending();

        // insert into database
        $http.post(urlPrefix + '/app/student/new-student', student).then(function(res){
            // truncate the model after successful insert
            $scope.student = {};
            toastr.info('New Student Saved Successfully!!!');
        }).catch(function(error){
            toastr.error(error.data);
        });

    };

    // validate the student
    function validate(student){
        var mandatoryFields = [{fieldName:'_id', errorMessage:'Please Enter Admission Number'}];
        mandatoryFields.push({fieldName:'firstName', errorMessage:'Please Enter First Name'});
        mandatoryFields.push({fieldName:'lastName', errorMessage:'Please Enter Last Name'});
        mandatoryFields.push({fieldName:'feesPerMonth', errorMessage:'Please Enter Fees Per Month'});
        var isValid = true;
        mandatoryFields.forEach(function(item){
            if((angular.isString(student[item.fieldName]) && !student[item.fieldName].trim()) || !student[item.fieldName]){
                isValid = false;
                toastr.error(item.errorMessage);
            }
        });

        return isValid;
    }



}