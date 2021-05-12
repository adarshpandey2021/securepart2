const mongoose=require('mongoose');

const NotificationSchema=new mongoose.Schema({
    departmentName:{
        type:String
    },
    role:{
        type:String
    },
    jobProfile:{
        type:String
    },
    jobDescription:{
        type:String
    },
    skillReq:{
        type:String
    },
    qualificationReq:{
        type:String
    }
})

module.exports=mongoose.model('NotificationSchema',NotificationSchema)