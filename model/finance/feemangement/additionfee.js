const mongoose=require("mongoose");

const AdditionFee= new mongoose.Schema({
    grade:{
        type:String,
      },
      branch:{
          type:String
      },
      additionfee:{
          type:String
      }
})
module.exports=mongoose.model("AdditionFee",AdditionFee);
