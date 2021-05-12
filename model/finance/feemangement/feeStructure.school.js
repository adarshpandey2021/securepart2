const mongoose=require('mongoose')

const SchoolFeeStructureSchema=new mongoose.Schema({
        
            classFor:{
                type:String
            },
            location:{
                type:String
            },
            feeHeadSF:{
                type:String
            },
            amountSF:{
                type:Number
            }

},{timestamp:true})
module.exports=mongoose.model('SchoolFeeStructureSchema',SchoolFeeStructureSchema)