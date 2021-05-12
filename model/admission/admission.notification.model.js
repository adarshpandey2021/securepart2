const mongoose= require('mongoose');

const AdmissionNotificationDetails=new mongoose.Schema({
    
    classFor:{
        type:String,
        require:true
    },
    startDate:{
        type:Date,
        require:true
    },
    
    branch:{
        type:String,
        require:true,
    },
    lastDate:{
        type:Date,
        require:true
    },
    stream:{
        type:String,
        require:true
    },
    numberOfSeats:{
        type:Number,
        require:true
    },
    remark:{
        type:String,
        require:true
    },

   
},{timestamps:true})

module.exports=mongoose.model("AdmissionNotificationDetails",AdmissionNotificationDetails)