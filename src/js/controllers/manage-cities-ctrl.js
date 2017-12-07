angular.module('RDash')
    .controller('ManageCitiesCtrl', ['urlPrefix','$http','ModalService', ManageCitiesCtrl]);

function ManageCitiesCtrl(urlPrefix, $http, ModalService){

    let manageCitiesCtrl = this;

    //load all classes
    loadAllCities();

    manageCitiesCtrl.cityName = "";

    manageCitiesCtrl.deleteCity = function(cityName){

        ModalService.confirm('Are you sure you want to delete city?').then(function(){

            let postBody = {
                collectionName: 'cities',
                removeCriteria: {_id: {'$eq':cityName}}
            };

            $http.post(urlPrefix + '/app/delete',postBody).then(function(res){
                toastr.info(`City ${cityName} deleted successfully!`);
                loadAllCities();
            }).catch(function(err){
                toastr.error(err);
            });

        })
    };

    function isDuplicateCityName(cityName){
        let duplicateItem = manageCitiesCtrl.cityList.find((item)=>{
            return item._id.toUpperCase() === cityName.toUpperCase();
        });
        return !!duplicateItem;
    }

    manageCitiesCtrl.addNewCity = function(){
        if(!manageCitiesCtrl.cityName.trim()){
            toastr.error('Please Provide City Name...');
            return;
        }

        if(isDuplicateCityName(manageCitiesCtrl.cityName)){
            toastr.error(`City ${manageCitiesCtrl.cityName} already exists`);
            return;
        }

        let postBody = {
            collectionName:'cities',
            payloadToBeInserted: {
                _id: manageCitiesCtrl.cityName
            }
        };

        $http.post(urlPrefix + '/app/insert', postBody).then(function(response){
            loadAllCities();
            toastr.info(`City ${manageCitiesCtrl.cityName} added successfully!`);
            manageCitiesCtrl.cityName = "";
        }).catch(function(err){
            toastr.error('Error while Adding New City...');
        })
    };

    manageCitiesCtrl.updateCity = function(cityName){
        if(isDuplicateCityName(cityName)){
            toastr.error(`City ${cityName} already exists`);
            return;
        }
        let postBody = {
            collectionName: 'cities',
            updateCriteria: {
                _id: cityName
            },
            updatedContent: {_id: cityName}
        };
        $http.post(urlPrefix + '/app/update', postBody).then(function(response){
            loadAllCities();
            toastr.info(`City ${cityName} updated successfully!`);
        }).catch(function(err){
            toastr.error('Error while updating cities...');
        })
    };

    // load all cities
    function loadAllCities(){
        let readAllCities = {
            collectionName: 'cities',
            filter:{},
            sort:{
                _id:1
            }
        };
        $http.post(urlPrefix + '/app/read', readAllCities).then(function(response){
            manageCitiesCtrl.cityList = response.data || [];
        }).catch(function(err){
            toastr.error('Error while fetching cities...');
        });
    }

}