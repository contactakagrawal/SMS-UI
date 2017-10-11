angular.module('RDash')
    .controller('ManageStudentsCtrl', ['$scope', 'urlPrefix', '$http', '$state', 'localStorageService', 'ModalService', ManageStudentsCtrl]);


function ManageStudentsCtrl($scope, urlPrefix, $http, $state, localStorageService, ModalService){

    var currentFilterCriteria = {};
    function loadStudents(){
        var postBody = {
            collectionName: 'students',
            limit:20,
            filter: currentFilterCriteria
        };
        $http.post(urlPrefix + '/app/read',postBody).then(function(studentsData){
            $scope.studentsData = studentsData.data;
        }).catch(function(err){
            toastr.error(err.data);
        });
    }

    // init
    loadStudents();

    $scope.searchFields = [{label: 'Admission Number', fieldName:'_id'}];
    $scope.searchFields.push({label: 'First Name', fieldName:'firstName'});
    $scope.searchFields.push({label: 'Last Name', fieldName:'lastName'});
    $scope.searchFields.push({label: 'Class Number', fieldName:'classNumber'});
    $scope.searchFields.push({label: 'Mobile Number', fieldName:'mobileNumber'});

    $scope.searchStudents = function(){
        var fieldName = $scope.search.searchField.fieldName;
        var fieldValue = $scope.search.searchValue;
        currentFilterCriteria = {};
        currentFilterCriteria[fieldName] = fieldValue;
        loadStudents();
    };

    $scope.resetFilters = function(){
        $scope.search = {};
        currentFilterCriteria = {};
        loadStudents();
    };

    $scope.newStudent = function(){
        $state.go('new-student');
        //toastr.info('Are you the 6 fingered man?');
    };

    function doUpdateStudent(studentToBeOperated){
        if(studentToBeOperated.length === 0){
            toastr.error('Please select atleast one student from the list');
            return;
        }
        if(studentToBeOperated.length > 1){
            toastr.error('Please select only one student from the list');
            return;
        }
        localStorageService.set('student-to-be-updated', studentToBeOperated[0]);
        $state.go('update-student');
    }

    function doDelete(studentToBeOperated){
        if(studentToBeOperated.length === 0){
            toastr.error('Please select atleast one student from the list');
            return;
        }

        ModalService.confirm('Are you sure you want to delete students?').then(function(){
            var ids = studentToBeOperated.map(function(item){
                return item._id;
            });

            var postBody = {
                collectionName: 'students',
                removeCriteria: {_id: {'$in':ids}}
            };

            $http.post(urlPrefix + '/app/delete',postBody).then(function(studentsData){
                toastr.info('selected students deleted successfully!!!');
                loadStudents();
            }).catch(function(err){
                toastr.error(err);
            });

        })
    }

    function doManageFees(studentToBeOperated){
        if(studentToBeOperated.length === 0){
            toastr.error('Please select atleast one student from the list');
            return;
        }
        if(studentToBeOperated.length > 1){
            toastr.error('Please select only one student from the list');
            return;
        }
        localStorageService.set('selected-student', studentToBeOperated[0]);
        $state.go('manage-fees');
    }

    $scope.applyOperation = function(selectedOperationType){
        var studentToBeOperated = $scope.studentsData.filter(function(student){
            return student.selected;
        });
        switch(selectedOperationType){
            case 'View/Update': doUpdateStudent(studentToBeOperated);
                                break;
            case 'Delete':doDelete(studentToBeOperated);break;
            case 'Fee Details':doManageFees(studentToBeOperated);;break;
        }
    }
}