angular.module('RDash')
    .controller('ManageStudentsCtrl', ['$scope', 'urlPrefix', '$http', '$state', 'localStorageService', 'ModalService', 'Student', ManageStudentsCtrl]);


function ManageStudentsCtrl($scope, urlPrefix, $http, $state, localStorageService, ModalService, Student){

    let manageStudentsCtrl = this;

    let currentFilterCriteria = {};
    function loadStudents(){
        let postBody = {
            collectionName: 'students',
            limit:20,
            filter: currentFilterCriteria
        };
        $http.post(urlPrefix + '/app/read',postBody).then(function(studentsData){
            manageStudentsCtrl.studentsData = studentsData.data.map((student)=>{
                return new Student(student);
            });
        }).catch(function(err){
            toastr.error(err.data);
        });
    }

    // init
    loadStudents();

    manageStudentsCtrl.searchFields = [{label: 'Admission Number', fieldName:'_id'}];
    manageStudentsCtrl.searchFields.push({label: 'First Name', fieldName:'firstName'});
    manageStudentsCtrl.searchFields.push({label: 'Last Name', fieldName:'lastName'});
    manageStudentsCtrl.searchFields.push({label: 'Class Number', fieldName:'classNumber'});
    manageStudentsCtrl.searchFields.push({label: 'Mobile Number', fieldName:'mobileNumber'});

    manageStudentsCtrl.searchStudents = function(){
        let fieldName = manageStudentsCtrl.search.searchField.fieldName;
        let fieldValue = manageStudentsCtrl.search.searchValue;
        currentFilterCriteria = {};
        currentFilterCriteria[fieldName] = fieldValue;
        loadStudents();
    };

    manageStudentsCtrl.resetFilters = function(){
        manageStudentsCtrl.search = {};
        currentFilterCriteria = {};
        loadStudents();
    };

    manageStudentsCtrl.newStudent = function(){
        $state.go('dashboard.new-student');
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
        $state.go('dashboard.update-student');
    }

    function doDelete(studentToBeOperated){
        if(studentToBeOperated.length === 0){
            toastr.error('Please select atleast one student from the list');
            return;
        }

        ModalService.confirm('Are you sure you want to delete students?').then(function(){
            let ids = studentToBeOperated.map(function(item){
                return item._id;
            });

            let postBody = {
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
        $state.go('dashboard.manage-fees');
    }

    manageStudentsCtrl.applyOperation = function(selectedOperationType){
        let studentToBeOperated = manageStudentsCtrl.studentsData.filter(function(student){
            return student.selected;
        });
        switch(selectedOperationType){
            case 'View/Update': doUpdateStudent(studentToBeOperated);
                                break;
            case 'Delete':doDelete(studentToBeOperated);break;
            case 'Fee Details':doManageFees(studentToBeOperated);break;
        }
    }
}