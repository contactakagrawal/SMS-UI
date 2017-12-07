angular.module('RDash')
    .controller('NewStudentsCtrl', ['$scope', 'urlPrefix', '$http', '$state', 'localStorageService','Student', 'Upload', NewStudentsCtrl]);


function NewStudentsCtrl($scope, urlPrefix, $http, $state, localStorageService, Student, Upload){

    $scope.student = {};
    $scope.relationTypes = ['Father', 'Mother', 'Brother', 'Sister', 'Uncle'];
    $scope.genderList = ['Male', 'Female'];
    $scope.religionList = ['Hindu', 'Muslim', 'Christian', 'Punjabi'];
    $scope.categoryList = ['General', 'OBC', 'SC/ST'];

    loadAllClasses();

    // update the fees section in db
    function loadAllClasses(){
        let readAllClasses = {
            collectionName: 'classes',
            filter:{},
            sort:{
                serialNumber:1
            }
        };
        $http.post(urlPrefix + '/app/read', readAllClasses).then(function(response){
            $scope.classList = response.data || [];
        }).catch(function(err){
            toastr.error('Error while fetching classes...');
        });
    }


    $scope.upload = function (file) {
        Upload.upload({
            url: urlPrefix + '/app/student/upload',
            data: {file: file, 'username': 'amit'}
        }).then(function (resp) {
            $scope.student.thumbNail = resp.config.data.file.name;
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    $scope.backToManageStudent = function(){
        $state.go('dashboard.manage-students');
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
        let student  = new Student($scope.student);
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