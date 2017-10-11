angular.module('RDash')
    .service('UtilityService', [UtilityService]);


function UtilityService(){

    this.calcFees = function(student){
        student.feesPerMonth = parseInt(student.feesPerMonth);
        student.totalFeesPending = 0;
        var totalFees = 0, totalCollected = 0;
        for(var i=0;i<student.feesArray.length;i++){
            student.feesArray[i].fees = student.feesPerMonth;
            totalFees = totalFees + student.feesPerMonth;
            totalCollected = totalCollected + parseInt(student.feesArray[i].deposit) || 0;
        }
        student.totalFeesPending = totalFees - totalCollected;
    };

}