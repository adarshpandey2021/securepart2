const mongoose=require('mongoose')

const AdmissionFeeStructureSchema=new mongoose.Schema({
        
            classFor:{
                type:String
            },
            location:{
                type:String
            },
            feeHead:{
                type:String
            },
            feeTypeAF:{
             type:String
            },
            amountAF:{
               type:Number
           }


},{timestamp:true})
module.exports=mongoose.model('AdmissionFeeStructureSchema',AdmissionFeeStructureSchema)