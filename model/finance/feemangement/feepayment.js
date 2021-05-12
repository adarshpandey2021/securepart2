const mongoose=require('mongoose');

   const feeDues=new mongoose.Schema({
       session:{
           type:String
       },
       duesUptoMonth:{
           type:String
       },
       paidAmount:{
           type:String
       },
       dueAmount:{
           type:String
       },

   })

const feedetails=new mongoose.Schema({
       feeType:{
           type:String
       },
       frequency:{
           type:String
       },
       monthYear:{
           type:String
       },
       amount:{
           type:Number
       },
       amountToPay:{
        type:Number
    },
    due:{
        type:String
    },
   paid:{
       type:Number
   },
   balance:{
       type:Number
   }       
   })



const FeePayment=new mongoose.Schema({
    
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ApplicantSchema"
    },
    studentName:{
        type:String
    },
    classOf:{

    },
    uptoMonth:{
        type:String
    },
    feeDues:[feeDues],
    feedetails:[feedetails]


})

module.exports=mongoose.model("FeePayment",FeePayment)