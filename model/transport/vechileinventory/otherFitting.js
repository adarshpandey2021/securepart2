const mongoose=require('mongoose');

const OtherFittingSchema=new mongoose.Schema({
    cctv:{
        type:String
    },
    firstAidBox:{
      type:String
    },
    fireExtinguisher:{
      type:String
    },
    fireExtinguisherRefilingDate:{
        type:String
      },
    

})

module.exports=mongoose.model("OtherFittingSchema",OtherFittingSchema)