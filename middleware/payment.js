function paymentCheck(req,res,next)

{   const paymentStatus='completed';

   

    try{
        if(paymentStatus==='completed')
        next()
        else{
            res.status(400).json({msg:"payment is not done,so final submit couldn't to proceed"})
        }
    }
    catch(e){
        res.status(400).json({msg:"payment is not done,so final submit couldn't to proceed"})
    }
}

module.exports={
    paymentCheck
}