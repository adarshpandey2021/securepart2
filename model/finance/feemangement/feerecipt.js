const mongoose=require('mongoose')

const FeeReceiptSchema=new mongoose.Schema({

      admissionNo:{
          type:Number
      },                        
      nameOfStudent:{
          type:String
      },
      gender:{
        type:String
    },
    phoneNo:{
        type:Number
    },
    studentStatus:{
        type:String
    },
    quarter:{
        type:String
    },
    paidAmount:{
        type:Number         
    },
    outstanding:{
        type:Number
    },
    paymentMode:{
        type:String
    },
    dateOfPayment:{
        type:String
    },
    feeType:{
        type:String
    }

})
module.exports=mongoose.model("FeeReceiptSchema",FeeReceiptSchema)