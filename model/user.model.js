const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ["HRManager","AdmissionIncharge","TransportManager","AccountManager","Driver","Conductor","Teacher","HOD","BASIC","Journal","MaintenanceManage"],
        default: "BASIC"
    },
    registerDate:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

module.exports=mongoose.model("UserSchema",UserSchema)