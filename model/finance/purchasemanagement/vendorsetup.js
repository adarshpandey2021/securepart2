const mongoose=require('mongoose');;

const VendorSetup=new mongoose.Schema({
    vendor:{
        type:String
    },
    ownerName:{
        type:String
    },
    bankName:{
        type:String
    },
    bankNumber:{
        type:Number
    },
    email:{
        type:String
    },
    mobile:{
        type:Number
    },
    gstNo:{
        type:String
    },
    street1:{
        type:String,
     },
     street2:{
        type:String,
     },
     city:{
        type:String,
     },
     state:{
        type:String,
     }, 
      pincode:{
        type:String,
     },
     fulladdress:{
         type:String
     },
})

module.exports=mongoose.model("VendorSetup",VendorSetup)