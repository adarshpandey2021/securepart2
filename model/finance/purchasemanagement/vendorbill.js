const mongoose=require("mongoose");

const VendorBillSchema=new mongoose.Schema({

    orderNo:{
        type:String
    },
    vendor:{
        type:String
    },
    product:{
        type:String
    },
    paymentmode:{
        type:String
    },
    paymentType:{
        type:String
    },
    billDate:{
        type:String
    },
   billUploads:{
        type:String
    },
    quantity:{
        type:Number
    },
    unitPrice:{
        type:Number
    },
    discount:{
        type:Number
    },
    taxes:{
        type:Number
    },
    currentAmount:{
        type:Number
    },
    totalAmount:{
        type:Number
    },
    status:{
        type:String,
        enum:["Receive","Pending"],
        default:"Pending"
    }

})

module.exports=mongoose.model("VendorBillSchema",VendorBillSchema)