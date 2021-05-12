const mongoose=require('mongoose')

const AdmissionReportSchema=new mongoose.Schema({
    admissionNo:{
        type:Number
    },
    dateOfAdmission:{
        type:String
    },
    classIn:{
        type:String
    },
    section:{
        type:String
    },
    busRouteNo:{
        type:String
    },
    remaindermessage:{
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model('AdmissionReportSchema',AdmissionReportSchema)