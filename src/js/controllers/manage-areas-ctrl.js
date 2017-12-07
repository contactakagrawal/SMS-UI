angular.module('RDash')
    .controller('ManageAreasCtrl', ['urlPrefix','$http','ModalService', ManageAreasCtrl]);

function ManageAreasCtrl(urlPrefix, $http, ModalService){

    let manageAreasCtrl = this;

    //load all areas & cities
    loadAllCities()

    manageAreasCtrl.area = {};

    manageAreasCtrl.deleteArea = function(area){

        ModalService.confirm('Are you sure you want to delete area?').then(function(){

            let postBody = {
                collectionName: 'areas',
                removeCriteria: {_id: {'$eq':area._id}}
            };

            $http.post(urlPrefix + '/app/delete',postBody).then(function(res){
                toastr.info(`Area ${area.areaName} deleted successfully!`);
                loadAllAreas();
            }).catch(function(err){
                toastr.error(err);
            });

        })
    };

    function isDuplicateArea(area){
        let duplicateItem = manageAreasCtrl.areaList.find((item)=>{
            return item._id.toUpperCase() === area.areaName.toUpperCase() + '_' + area.city._id.toUpperCase();
        });
        return !!duplicateItem;
    }

    manageAreasCtrl.addNewArea = function(){
        if(!manageAreasCtrl.area.areaName){
            toastr.error('Please Provide Area Name...');
            return;
        }

        if(!manageAreasCtrl.area.city){
            toastr.error('Please Provide City Name...');
            return;
        }

        if(isDuplicateArea(manageAreasCtrl.area)){
            toastr.error(`Area ${manageAreasCtrl.area.areaName} already exists`);
            return;
        }

        let postBody = {
            collectionName:'areas',
            payloadToBeInserted: {
                _id: manageAreasCtrl.area.areaName + '_' + manageAreasCtrl.area.city._id,
                areaName: manageAreasCtrl.area.areaName,
                cityName: manageAreasCtrl.area.city._id
            }
        };

        $http.post(urlPrefix + '/app/insert', postBody).then(function(response){
            loadAllAreas();
            toastr.info(`Area ${manageAreasCtrl.area.areaName} added successfully!`);
            manageAreasCtrl.area = {};
        }).catch(function(err){
            toastr.error('Error while Adding New Area...');
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
            manageAreasCtrl.cityList = response.data || [];
            loadAllAreas();
        }).catch(function(err){
            toastr.error('Error while fetching cities...');
        });
    }

    // load all areas
    function loadAllAreas(){
        let readAllAreas = {
            collectionName: 'areas',
            filter:{},
            sort:{
                areaName:1
            }
        };
        $http.post(urlPrefix + '/app/read', readAllAreas).then(function(response){
            manageAreasCtrl.areaList = response.data || [];
            manageAreasCtrl.areaList.forEach((area)=>{
                area.city = manageAreasCtrl.cityList.find((city)=>{
                    return city._id === area.cityName;
                })
            })
        }).catch(function(err){
            toastr.error('Error while fetching areas...');
        });
    }

}