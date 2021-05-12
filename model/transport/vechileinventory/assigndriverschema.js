const mongoose=require('mongoose');

const AssignDriverSchema=new mongoose.Schema({
    nameOfDriver:{
        type:String
    },
    drivingLicenseNo:{
        type:String
    },
    drivingLicenseValid:{
        type:String
    },
    uploadCopyOfDrivingLicence:{
        type:String
    },
   uploadMedicalFitnessCerti:{
        type:String
    },
    primaryContactNoDriver:{
        type:String
    },
    secondaryContactNoDriver:{
        type:String
    },
    adharcardDriver:{
        type:Number
    },
   pancardDriver:{
        type:String
    },
    driverResidentialAddress:[
        {resStreet:{type:String},resCity:{type:String},
        resState:{type:String},resPincode:{type:String} ,
        reslandmark:{type:String},
        resFulladdress:{type:String}},
       
    ],
    driverPermanentAddress:[
        {perStreet:{type:String},perCity:{type:String},
        perState:{type:String},perPincode:{type:String} ,
        perlandmark:{type:String},
        perFulladdress:{type:String}},
       
    ]
})
module.exports=mongoose.model("AssignDriverSchema",AssignDriverSchema)