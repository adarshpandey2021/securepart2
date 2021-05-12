const mongoose=require('mongoose');

const AdmissionNoSchema=new mongoose.Schema({
    applicationNo:{
        type:String
    },
    admissionNo:{
        type:Number
    }
})

module.exports=mongoose.model('AdmissionNoSchema',AdmissionNoSchema)