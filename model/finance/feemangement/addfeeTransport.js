const mongoose=require('mongoose');

const AddFeesTransport=new mongoose.Schema({
    location:{
        type:String
    },
            distance:{
                type:Number
            },
            amountTF:{
                type:Number
            },
            startKm:{
                type:Number    
            },
            endKm:{
                type:Number
            },
      
})
module.exports=mongoose.model("AddFeesTransport",AddFeesTransport);