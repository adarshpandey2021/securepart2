const User=require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken");

exports.signUp = (req, res) => {
    const { name, email, password,role,} = req.body;
    if(!name || !email || !password)
    {
      return res.status(400).json({msg:"pls enter all fields"});
    }
    User.findOne({ email }).exec((err, user) => {
      if (err) {
        console.log(err);
  
        return res.status(422).json({
          error: "Something went wrong!!",
        });}
        if(user){ 
        return res.status(400).json({
          error: "Email already exists.",
        });
    }
      
      const newUser= new User({
          name,email,password,
      })
      bcrypt.genSalt(10,(err,salt)=>{
          bcrypt.hash(newUser.password,salt,(err,hash)=>{
              if(err) throw err;
              newUser.password=hash;
              newUser.save((d,err)=>{
                  if(err) console.log(err)
              })
                 return  res.json({ 
                    user:{
                        name,
                        email,
                        role,
                        } })     
              
          })
      })

})
}


exports.signIn=(req,res)=>{
    const { email,password}=req.body;
  
    if(!email|| !password) 
      {
        return res.status(400).json({message:"Please Enter all Fields"});
      } 
      
      User.findOne({email}).exec((err,user)=>{
  
        if(!user) 
        {
          return res.status(400).json({msg:"User doesn't exists"})
        }
  
        bcrypt.compare(password,user.password)
        .then(isMatch=>{
          if(!isMatch) return res.status(400).json({msg:"Invalid Password"});
          payload={
            _id:user._id,
            role:user.role
          }
  
          const token=jwt.sign(payload,process.env.JWT_SECRET,{
           
            expiresIn:"7d",
          })
  
          const{name,email,role}=user
  
          return  res.json({ 
            token,
            user:{
                name,
                email,
                role
                } })   
  
      
      })
  
  
    })   
  }


  exports.AssignROle=async(req,res,next)=>{
    try{
       const {email,role}=req.body
       let find_Data=await User.findOne({email:email})
       find_Data.role=role
       let data=find_Data.save()
       return res.json({
         status:true,
         message:'Role is Assigned!!'
       })
           
    }
    catch(e){
      return res.status(400).json({
        message:e.message,
        status:false
      })
    }


  }