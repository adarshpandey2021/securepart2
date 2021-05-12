const mongoose=require("mongoose");

const LogBook=new mongoose.Schema({
      driverlog:[{
          tripNo:{
              type:String
          },
          startKm:{
              type:String
          },
          endKm:{
            type:String
        },
      }],
      conductorlog:[{
          stopageName:{
              type:String
          },
          nameOfStudent:{
              type:String
          },
          status:{
              type:String
          }
      }]
})

module.exports=mongoose.model('LogBooK',LogBook)