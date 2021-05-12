const mongoose=require('mongoose')

const TransportFeeStructureSchema=new mongoose.Schema({
        
            classFor:{
                type:String
            },
            location:{
                type:String
            },
            distance:{
                type:String
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



},{timestamp:true})
module.exports=mongoose.model('TransportFeeStructureSchema',TransportFeeStructureSchema)