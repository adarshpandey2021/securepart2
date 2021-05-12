const mongoose=require('mongoose');

const CreateHolidays= new mongoose.Schema({
    holidayName:{
        type:String
    },
    fromDate:{
        type:String
    },
    toDate:{
        type:String
    },
    total:{
        type:String
    },
    addWeekHoliday:[{
        weeklyOff:{
        type:String
    }
}]

})

module.exports=mongoose.model('CreateHolidays',CreateHolidays)