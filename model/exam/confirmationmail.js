const mongoose=require('mongoose');

const ConfimMail=new mongoose.Schema({
    applicationNo:{
        type:String
    },
    admissionDate:{
        type:String
       
    },
    admissionTime:{
        type:String,
        
    },
   remaindermsg:{
        type:String,
        
    },
    
},{timestamps:true})
module.exports=mongoose.model("ConfirmMail",ConfimMail);