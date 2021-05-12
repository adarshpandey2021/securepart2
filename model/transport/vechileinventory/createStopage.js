const mongoose=require('mongoose');

const StopageSchema=new mongoose.Schema({
    routeNo:{
        type:String 
    },
    nameOfStop:{
        type:String
    },
    pickUpTime:{
        type:String
    },
    dropOfTime:{
        type:String
    },
    distanceFromSchool:{
        type:Number
    },
    stopageName:{
        type:String
    }
})
module.exports=mongoose.model("StopageSchema",StopageSchema)