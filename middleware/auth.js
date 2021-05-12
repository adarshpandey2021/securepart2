const jwt =require("jsonwebtoken");
require("dotenv").config();

function auth(req,res,next)
{
    const token=req.header("x-auth-token")

    if(!token)
    return res.status(401).json({msg:"NO token, authorization denied"})

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded
        next()
    }
    catch(e){
        res.status(400).json({msg:"Token is not valid"})
    }
}

function authRole(role)
{
       return (req,res,next)=>{
           if(req.user.role!==role){
                    res.status(401)
                    return res.send("Not Allowed")
           }
        next()

       }
}
module.exports={
    auth,
    authRole
} 