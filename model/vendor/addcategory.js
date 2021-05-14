const mongoose=require('mongoose')

const AddCategorySchema=new mongoose.Schema({
    category:{
        type:String
    }

},{timestamps:true})


module.exports=mongoose.model('AddCategorySchema',AddCategorySchema)