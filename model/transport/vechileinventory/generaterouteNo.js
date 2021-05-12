const mongoose=require('mongoose')

const GenerateRouteSchema=new mongoose.Schema({
    startingPoint:{
        type:String
    },
    endingPonit:{
        type:String
    },
    routeNo:{
        type:String
    }

})
module.exports=mongoose.model("GenerateRouteSchema",GenerateRouteSchema)