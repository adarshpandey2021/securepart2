const mongoose=require('mongoose');

const AssignFemaleAsstSchema=new mongoose.Schema({
    nameOfFemaleAsst:{
        type:String
    },
    femaleAsstPrimaryContactNo:{
        type:String
    },
    femaleAsstSecondaryContactNo:{
        type:String
    
    },
    femaleAsstAdharCard:{
        type:String
    },
    femaleAsstPanCard:{
        type:String
    },
    femaleAsstUploadId:{
        type:String
    },
    femaleResidentialAddress:[
        {resStreet:{type:String},resCity:{type:String},
        resState:{type:String},resPincode:{type:String} ,
        reslandmark:{type:String},
        resFulladdress:{type:String}},
       
    ],
    femalePermanentAddress:[
        {perStreet:{type:String},perCity:{type:String},
        perState:{type:String},perPincode:{type:String} ,
        perlandmark:{type:String},
        perFulladdress:{type:String}},
       
    ]

})

module.exports=mongoose.model("AssignFemaleAsstSchema",AssignFemaleAsstSchema)