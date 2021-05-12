const mongoose=require('mongoose');

const InterviewInfo=new mongoose.Schema({
    applicantNo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ApplicantSchema"
    },
    nameOfStudent:{
        type:String
    },
    classFor:{
        type:String
    },
    dateOfInterview:{
        type:String,
        require:true
    },
    startTime:{
        type:String,
        require:true
    },
    endTime:{
        type:String,
        require:true
    },
   
},{timestamps:true})
module.exports=mongoose.model("InterviewInfo",InterviewInfo);