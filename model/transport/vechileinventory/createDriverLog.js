const mongoose=require("mongoose");

const DriverLogBook=new mongoose.Schema({
   tripNo:{
        type:Number
    },
    startKm:{
        type:Number
    },
    endKm:{
      type:Number
  },
registerdate:{
    type:String,
    
},
  distance:{
      type:Number
  },
  startTime:{
      type:String
  },
  driverName:{
      type:String
  }

  },{timestamps:true})
 
module.exports=mongoose.model('DriverLogBooK',DriverLogBook)

