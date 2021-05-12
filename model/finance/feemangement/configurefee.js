const mongoose=require('mongoose');

const Configure=new mongoose.Schema({
    grade:{
        type:String
    },
    registrationFee:{
        type:Number
        
    },
    admissionFee:{
        type:Number
        
    },
    tutionFee:{
        type:Number
    },
    examFee:{
        type:Number
        
    },
    classTestFee:{
        type:Number
    },
    transportationFee:{
        type:Number
        },
    sportsFee:{
            type:Number
        },
        anualdayFee:{
                type:Number
        },
        total:{
            type:Number
        }
})

module.exports=mongoose.model("configurefee",Configure)