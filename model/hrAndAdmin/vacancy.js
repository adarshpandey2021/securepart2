const mongoose=require('mongoose');

const VacancySchema=new mongoose.Schema({

    departmentName:{
        type:String
    },
    role:{
        type:String
    },
    noOfVacancy:{
        type:String
    },
    lastDate:{
        type:String
    }
})
module.exports=mongoose.model('VacancySchema',VacancySchema);