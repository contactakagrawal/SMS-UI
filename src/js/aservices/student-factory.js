angular.module('RDash')
    .factory('Student', ['localStorageService', StudentFactory]);


function StudentFactory(localStorageService){

    function Student(student){
        this._id = student._id;
        this.firstName = student.firstName;
        this.lastName = student.lastName;
        this.dob = student.dob;
        this.classNumber = student.classNumber;
        this.doa = student.doa;
        this.feesPerMonth = parseInt(student.feesPerMonth) || 0;
        this.aadhaarNumber = student.aadhaarNumber;
        this.mobileNumber = student.mobileNumber;
        this.email = student.email;
        this.guardianDetails = student.guardianDetails || {};
        this.address = student.address || {};
        this.feesArray = student.feesArray || localStorageService.get('feesArray');
    }

    Student.prototype.initFeesThisMonthInFeesArray = function(){
        for(var i=0;i<this.feesArray.length;i++){
            this.feesArray[i].feesThisMonth = this.feesPerMonth;
        }
    };

    Student.prototype.evalTotalFeesExpectedAndPending = function(){
        var totalFeesExpected = 0, totalFeesCollected = 0;
        for(var i=0;i<this.feesArray.length;i++){
            totalFeesExpected = totalFeesExpected + this.feesArray[i].feesThisMonth;
            totalFeesCollected = totalFeesCollected + this.feesArray[i].deposit;
        }
        this.totalFeesPending = totalFeesExpected - totalFeesCollected;
        this.totalFeesExpected = totalFeesExpected;
    }

    return Student;
}

