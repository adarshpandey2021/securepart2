const mongoose=require('mongoose');

const AddFeeAdmission=new mongoose.Schema({
        
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
 
})
module.exports=mongoose.model("AddFessAdmission",AddFeeAdmission);