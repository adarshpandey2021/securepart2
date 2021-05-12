const mongoose=require('mongoose')

const ConcessionDataSchema=new mongoose.Schema({

    concessionType:{
        type:String
    },
    concessionInPercentage:{
        type:Number
    }


})
module.exports=mongoose.model("ConcessionDataSchema",ConcessionDataSchema)