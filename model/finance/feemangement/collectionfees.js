const mongoose=require('mongoose');

const CollectionFee=new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ApplicantSchema"
    },
   name:{
        type:String
        
    },
    classIn:{
        type:String
    },
    branch:{
    type:String
    },
    section:{
        type:String
    },
    feesType:{
        type:String
    },
    outstanding:{
        type:String
    },
    amount:{
        type:Number
    }

    
    
})

module.exports=mongoose.model("collectionfee",CollectionFee)