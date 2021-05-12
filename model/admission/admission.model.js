const mongoose= require('mongoose');
const Eligibility=new mongoose.Schema({
    eligibilityClassFor:{
        type:String
    },
    minAge:{
        type:String
    },
    maxAge:{
        type:String
    },
    applicationFee:{
        type:String
    }
})
const AdmissionDetails=new mongoose.Schema({
    applicationNo:{
        type:String,
        require:true,
    },
    academicYear:{
        type:String,
        require:true

    },
    startDate:{
        type:String,
        require:true
    },
    classFor:{
        type:String,
        require:true
    },
    branch:{
        type:String,
    },
    lastDate:{
        type:String,
        require:true
    },
    numberOfSeats:{
        type:Number,
        require:true
    },
    status: {
        type: String,
        enum: ['inProgress', 'Open', 'Closed'],
        default: "inProgress"
    },
    eligibilty:[Eligibility]

},{timestamps:true})

module.exports=mongoose.model("AdmissionDetails",AdmissionDetails)