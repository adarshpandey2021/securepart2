const mongoose=require('mongoose');

const AddFeeSchool=new mongoose.Schema({
    location:{
        type:String
    },
            feeHeadSF:{
                type:String
            },
            amountSF:{
                type:Number
            }
       
})
module.exports=mongoose.model("AddFeesSchool",AddFeeSchool);