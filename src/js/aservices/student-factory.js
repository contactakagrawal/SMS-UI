angular.module('RDash')
    .factory('Student', ['localStorageService', StudentFactory]);


function StudentFactory(localStorageService){

    function Student(student){
        this._id = student._id;
        this.firstName = student.firstName;
        this.lastName = student.lastName;
        this.dob = student.dob;
        this.className = student.classObj?student.classObj.className:student.className;
        this.doa = student.doa;
        this.feesPerMonth = parseInt(student.feesPerMonth) || 0;
        this.aadhaarNumber = student.aadhaarNumber;
        this.mobileNumber = student.mobileNumber;
        this.email = student.email;
        this.guardianDetails = student.guardianDetails || {};
        this.address = student.address || {};
        this.feesArray = student.feesArray || localStorageService.get('feesArray');
        this.totalFeesPending = student.totalFeesPending;
        this.totalFeesExpected = student.totalFeesExpected;
        this.gender = student.gender;
        this.category = student.category;
        this.religion = student.religion;
        this.thumbNail = student.thumbNail;
        //this.evalTotalFeesExpectedAndPending();
    }

    Student.prototype.initFeesThisMonthInFeesArray = function(){
        for(let i=0;i<this.feesArray.length;i++){
            this.feesArray[i].feesThisMonth = this.feesPerMonth;
        }
    };

    Student.prototype.evalTotalFeesExpectedAndPending = function(){
        let totalFeesExpected = 0, totalFeesCollected = 0;
        for(let i=0;i<this.feesArray.length;i++){
            totalFeesExpected = totalFeesExpected + this.feesArray[i].feesThisMonth;
            totalFeesCollected = totalFeesCollected + this.feesArray[i].deposit;
        }
        this.totalFeesPending = totalFeesExpected - totalFeesCollected;
        this.totalFeesExpected = totalFeesExpected;
    };

    return Student;
}

