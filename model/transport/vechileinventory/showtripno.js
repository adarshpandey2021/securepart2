const mongoose=require("mongoose");

const TripNoSchema=new mongoose.Schema({
          tripNo:{
              type:Number
          },
          show:{
              type:Boolean
          }

          })

module.exports=mongoose.model('TripNoSchema',TripNoSchema)