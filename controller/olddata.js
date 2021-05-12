// //interview process
// // send notification to selected applicant for interview
// //get list of appear applicant in interview
// router.post("/callforinterview",InterviewSortlist);
// router.get("/getinterviewappearlist",getInterviewAppearList);

// //results
// // make final selection //get list of final selected students
// router.patch("/finalselection/:id",FinalSelection)
// router.get("/getfinallist",GetFinalSelected); 







// //priviousapi
// //mark true for applicant who are selected for interview
// router.patch("/sortforinterview/:id",sortForInterview);  
// // list of applicant who are sort for interview
// router.get("/getsortforinterview",GetInterviewList)  

// router.post("/admissioninfo",AdmissionInfo);
// router.get("/getadmissiondetails",showAdmissionDetails);
// router.patch("/openstatus/:id",OpenStatus);
// router.patch("/closestatus/:id",ClosedStatus);

///  previous
// exports.sortForInterview=(req,res,next)=>{
//     const id=req.params.id;
//     ApplicantSchema.findById(id,(err,data)=>{
//         if(err) console.log(err);
//         else{
//             data.interview=true;
//             data.save((d,err)=>{
//                 if(err) throw err;
//                 res.send("Interview data updation done!!!")
//               })

//         }
//     })

// }
// exports.GetInterviewList=(req,res,next)=>{
//     ApplicantSchema.find({interview:true,finalSubmit:true},(err,list)=>{
//         if(err) throw err;
//         res.send({list:list})
//     })
// }


// ////////////////////////////////////////////////////////////////////////////////////////////////
    


// exports.AdmissionInfo=(req,res,next)=>{
//     const{applicationNo,academicYear,startDate,classFor,
//         branch,lastDate,numberOfSeats,admissionFee,eligibilityClassFor,
//         minAge,maxAge,applicationFee}=req.body;
//     if(!applicationNo||!startDate||!academicYear||!lastDate
//         ||!numberOfSeats||!admissionFee||!classFor)
//     {
//         return res.status(400).json({msg:"Please Enter all fields"});

//     }
//     let newData=new AdmissionDetails({applicationNo,academicYear,startDate,classFor,branch,
//         lastDate,numberOfSeats,admissionFee, eligibilty:{
//             eligibilityClassFor:eligibilityClassFor,
//             minAge:minAge,
//             maxAge:maxAge,
//             applicationFee:applicationFee

//         }});

//     newData.save((data,err)=>{
//         if (err) return console.log(err)

//         return res.json({
//             msg:'Data added',
//             data:{
                
//             }
            
//         })
//     })   
// }
//    exports.showAdmissionDetails=(req,res,next)=>{
//        AdmissionDetails.find({}).exec((err,List)=>{
//            if(err) console.log(err)
//            else{
//                res.send({List:List})
//            }
//        })

//    }

//    exports.OpenStatus=(req,res,next)=>{
//     const id=req.params.id;
//     ApplicantSchema.findById((id),(err,data)=>{
//         if(err) console.log(err);
//         else{
//             data.status="Open";
//             data.save((d,err)=>{
//               if(err) throw err;
//               res.send("Admission status is open")
//             })
//         }
//     })
// }
// exports.ClosedStatus=(req,res,next)=>{
//   const id=req.params.id;
//     ApplicantSchema.findById((id),(err,data)=>{
//         if(err) console.log(err);
//         else{
//             data.status="Closed";
//             data.save((d,err)=>{
//               if(err) throw err;
//               res.send("Admission status is closed")
//             })
//         }
//     })
// }

// interview controller

// exports.InterviewSortlist=async(req,res,next)=>{
    
//     const id=req.body.applicationNo
//     try{
//         const find_applicant=await ApplicantSchema.findById(id)
//         console.log(find_applicant)
//         const{dateOfInterview,nameOfStudent,classFor,startTime,endTime}=req.body;
//         const data=new InterviewInfo({dateOfInterview,nameOfStudent,classFor,startTime,endTime,applicationNo:id})
//         data.save((d,err)=>{
//             if(err) console.log(err)
        
//         })
//         await sendEmail(find_applicant.personalDetails[0].email,`Hello ${find_applicant.fullname}
//          you are shortlisted for last round i.e PI.
//          The  date for your  exam is
//          ${dateOfInterview} and Timming: Exam start at sharp ${startTime} and end at ${endTime}.
//          So Be On time`,find_applicant.fullname)
//         return res.status(200).json({msg:'Schedule has been sent!!'})
//     }
//     catch(e){
//         return next(e)
//     }

// }

// exports.getInterviewAppearList=(req,res,next)=>{
// InterviewInfo.find({}).exec((err,list)=>{
//     if(err) console.log(err);
//     else
//     return res.send({list:list})
// })
// }
///////////////////////////////////










