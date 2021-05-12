const mongoose=require('mongoose')

const AddPolicySchema=new mongoose.Schema({
    policy:{
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model('AddPolicySchema',AddPolicySchema)