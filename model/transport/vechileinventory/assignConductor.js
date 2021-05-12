const mongoose=require('mongoose');

const AssignConductorSchema=new mongoose.Schema({
    nameOfConductor:{
        type:String
    },
    conductorPrimaryNo:{
        type:String
    },
    conductorSecondaryNo:{
        type:String
    },
    adharcardConductor:{
        type:Number
    },
   pancardConductor:{
        type:String
    },
    uploadIdProof:{
        type:String
    },
    conductorResidentialAddress:[
        {resStreet:{type:String},resCity:{type:String},
        resState:{type:String},resPincode:{type:String} ,
        reslandmark:{type:String},
        resFulladdress:{type:String}},
       
    ],
    conductorPermanentAddress:[
        {perStreet:{type:String},perCity:{type:String},
        perState:{type:String},perPincode:{type:String} ,
        perlandmark:{type:String},
        perFulladdress:{type:String}},
       
    ],
    
})
module.exports=mongoose.model("AssignConductorSchema",AssignConductorSchema)