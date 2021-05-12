const mongoose=require("mongoose");

const ConductorLogBook=new mongoose.Schema({
          stopageName:{
              type:String
          },
          nameOfStudent:{
              type:String 
          },
          status:{
              type:String,
               default:"Present"}

},{timestamps:true})

module.exports=mongoose.model('ConductorLogBooK',ConductorLogBook)