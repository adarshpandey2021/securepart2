const mongoose=require('mongoose');

const MailInfo=new mongoose.Schema({
    applicationNo:{
        type: String
    },
    screeningDate:{
        type:String
       
    },
    screeningTime:{
        type:String,
        
    },
   remaindermsg:{
        type:String,
        
    },
    
},{timestamps:true})
module.exports=mongoose.model("MailInfo",MailInfo);