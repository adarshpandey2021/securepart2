
const mongoose=require('mongoose');

const PurchaseOrderSchema=new mongoose.Schema({
    quotationId:{
        type:String
    },
vendor:{
    type:String
},
vendorRef:{
    type:String
},
purchaseAgreement:{
   type:String    

},
orderDate:{
    type:String
},
product:{
    type:String
},
scheduleDate:{
    type:String
},
quantity:{
    type:Number
},
unitPrice:{
    type:Number
},
taxes:{
    type:Number
},
subtotal:{
    type:Number
},
billuploads:{
    type:String
},
description:{
    type:String
    
},
status:{
    type:String,
    enum:["Receive","Pending"],
    defualt:"Pending"
}
})
module.exports=mongoose.model("PurchaseOrderSchema",PurchaseOrderSchema)