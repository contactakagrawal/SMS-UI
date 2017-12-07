angular.module('RDash')
    .controller('ManageClassesCtrl', ['urlPrefix','$http','ModalService', ManageClassesCtrl]);

function ManageClassesCtrl(urlPrefix, $http, ModalService){

    let manageClassesCtrl = this;

    //load all classes
    loadAllClasses();

    manageClassesCtrl.class = {};

    manageClassesCtrl.deleteClass = function(classItem){

        ModalService.confirm('Are you sure you want to delete class?').then(function(){

            let postBody = {
                collectionName: 'classes',
                removeCriteria: {_id: {'$eq':classItem._id}}
            };

            $http.post(urlPrefix + '/app/delete',postBody).then(function(studentsData){
                toastr.info(`Class ${classItem.className} deleted successfully!`);
                loadAllClasses();
            }).catch(function(err){
                toastr.error(err);
            });

        })
    };

    function isDuplicateClassName(classItem){
        let duplicateItem = manageClassesCtrl.classList.find((item)=>{
            return item.className.toUpperCase() === classItem.className.toUpperCase();
        });
        return !!duplicateItem;
    }
    manageClassesCtrl.addNewClass = function(){
        if(!manageClassesCtrl.class.className){
            toastr.error('Please Provide Class Name...');
            return;
        }
        if(!manageClassesCtrl.class.serialNumber){
            toastr.error('Please Provide Serial Number...');
            return;
        }
        if(isDuplicateClassName(manageClassesCtrl.class)){
            toastr.error(`Class ${manageClassesCtrl.class.className} already exists`);
            return;
        }
        manageClassesCtrl.class._id = manageClassesCtrl.class.className;
        let postBody = {
            collectionName:'classes',
            newPayLoad: manageClassesCtrl.class
        };
        $http.post(urlPrefix + '/app/save', postBody).then(function(response){
            loadAllClasses();
            manageClassesCtrl.class = {};
            toastr.info(`Class added successfully!`);
        }).catch(function(err){
            toastr.error('Error while Adding New Class...');
        })
    };

    manageClassesCtrl.updateClass = function(classItem){
        if(isDuplicateClassName(classItem)){
            toastr.error(`Class ${classItem.className} already exists`);
            return;
        }
        let postBody = {
            collectionName: 'classes',
            updateCriteria: {
                _id: classItem._id
            },
            updatedContent: classItem
        };
        $http.post(urlPrefix + '/app/update', postBody).then(function(response){
            loadAllClasses();
            toastr.info(`Class ${classItem.className} updated successfully!`);
        }).catch(function(err){
            toastr.error('Error while updating Class...');
        })
    };

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
            manageClassesCtrl.classList = response.data || [];
        }).catch(function(err){
            toastr.error('Error while fetching classes...');
        });
    }

}