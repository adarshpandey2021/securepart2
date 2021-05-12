const mongoose=require('mongoose');

const Stopage=new mongoose.Schema({
    stopageRouteNo:{
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
        type:String
    }
})

const RouteNo=new mongoose.Schema({
   startingPoint:{
        type:String
    },
    endingPonit:{
        type:String
    },
    nameOfStop:{
        type:String
    },
    distanceFromSchool:{
        type:String
    }
})




const CreateRoute=new mongoose.Schema({
    routeNo:[RouteNo],
    vechileType:{
        type:String
    },
    vechicleNo:{
        type:String
    },
    driverName:{
        type:String
    },
    conductorName:{
        type:String
    },
    femaleAsstName:{
        type:String
    },
    stopage:[Stopage]
})

module.exports=mongoose.model('CreateRoute',CreateRoute)