angular.module('RDash')
    .service('ModalService', ['$uibModal', ModalService]);


function ModalService($uibModal){

    this.confirm = function(message){
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '../templates/my-modal-content.html',
            controller:function($uibModalInstance ,$scope,message){
                $scope.message = message;
                $scope.ok = function () {
                    $uibModalInstance.close('closed');
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            resolve: {
                message: function () {
                    return message;
                }
            }
        });

        return modalInstance.result;
    };

}