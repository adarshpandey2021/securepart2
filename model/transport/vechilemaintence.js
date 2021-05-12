const mongoose=require('mongoose');

const VechileMaintenance=new mongoose.Schema({
    vechileType:{
        type:String
    },
    vechileNo:{
        type:String
    },
    repairDate:{
        type:String,
    },
    maintenanceDate:{
        type:String
    },
    vendorName:{
        type:String
    },
    billNo:{
        type:String
    },
    amount:{
        type:String
    }
},{timestamps:true})


module.exports=mongoose.model('VechileMaintenance',VechileMaintenance)