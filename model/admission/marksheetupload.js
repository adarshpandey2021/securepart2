const mongoose=require('mongoose')

const MarkSheetUpload=new mongoose.Schema({
    academicMarksheet:{
        type:String
    }
},{timestamps:true})
module.exports=mongoose.model("MarksheetUpload",MarkSheetUpload)