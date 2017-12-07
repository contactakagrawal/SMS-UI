angular.module('RDash')
    .controller('LoginCtrl', ['$state', LoginCtrl]);


function LoginCtrl($state){

    let login = this;

    login.login = function(){
        $state.go('dashboard.manage-students');
    }
}