const mongoose=require('mongoose');
const counter = require('../../utils/counter');

const Quarter=new mongoose.Schema({
    fixDate:{
        type:String
    },
    lastDateOfDeposit:{
        type:String
    },
    scheduleLastFeeCharges:{
        type:String
    }
})

const AcademicRecord=new mongoose.Schema({
    acedemicYear:{
        type:String
    },
    academicGrade:{
        type:String
    },
    academicNameOfSchool:{
        type:String
    },
    academicMarksheet:{
        type:String
    }
})
const Achievement=new mongoose.Schema({
    area:{
        type:String
    },
    achievement:{
        type:String
    },
    participantLevel:{
        type:String
    },
})

const ContactDetail=new mongoose.Schema({
    street1:{
        type:String,
        require:true
     },
     street2:{
        type:String,
     },
     city:{
        type:String,
        require:true
     },
     state:{
        type:String,
        require:true
     }, 
      pincode:{
        type:String,
        require:true
     },
     landmark:{
      type:String,
      require:true
     },
     fulladdress:{
         type:String
     },
     primaryEmail:{
        type:String,
        require:true,
        lowercase:true
     },
     secondaryEmail:{
        type:String,
        trim:true,
        lowercase:true
     },
     primaryContact:{
        type:Number,
        require:true
       
    },
   secondaryContact:{
    type:Number,
   
    },
   tertiaryContact:{
    type:Number
     },
    contactRelation:{
        type:String
    }
})
const GaurdianDetails=new mongoose.Schema({
    gaurdianName:{
        type:String
    },
  
    officeContact:{
        type:String
    },
    gaurdianMobile1:{
        type:Number,
    
    },
    gaurdianMobile2:{
        type:Number,

       },
       gaurdianMobile3:{
        type:Number,
       },
       relation:{
        type:String
    },
    gaurdianEmail:{
        type:String,
        trim:true,
        lowercase:true
    },
    gaurdianEducation:{
        type:String
    },
    gaurdianOccupation:{
        type:String
    }
})

const SiblingsDetails=new mongoose.Schema({
    fullNameOfSibling:{
        type:String
    },
    classOfSibling:{
        type:String
    },
    genderOfSibling:{
        type:String
    },
    siblingSchool:{
        type:String
    },
})


const ApplicantSchema=new mongoose.Schema({
         firstName:{
             type:String,
             require:true
             
         },
         middleName:{
            type:String,
        },
        lastName:{
            type:String,
            require:true
        },
        fullname:{
            type:String
        },
        gender:{
            type:String,
            require:true
        },
        bloodGroup:{
            type:String,
            require:true
        },
        dateOfBirth:{
            type:String,
            require:true
           
         },
         age:{
            type:String,
         },
         nationality:{
            type:String,
            require:true
        },
        currentClass:{
         type:String,
        },
        classFor:{
            type:String,
            require:true
        },
        academicRecord:[AcademicRecord],
        achievement:[Achievement],
       contactDetail:[ContactDetail],
        gaurdianDetail:[GaurdianDetails],
        siblingDetail:[SiblingsDetails],
        status: {
            type: String,
            enum: ['pending', 'Fit For Screening', 'Not Consider'],
            default: "pending"
        },
        screeningDate:{
             type:String
        },
        screeningTime:{
            type:String
       },
         shortlist:{
            type:String,
            enum: ['Shortlisted','Waitlisted','pending'],
            default: "pending"
        },
         dobCerti:{
            type:Boolean,
            default:false
        },
        sssimdCerti:{
            type:Boolean,
            default:false
        },
        adharcardCerti:{
            type:Boolean,
            default:false
        },
        transferCerti:{
            type:Boolean,
            default:false
        },
        medicalCerti:{
            type:Boolean,
            default:false
        },
        action:{
            type:String,
                enum: ['Approve','Hold'],
                default: "Hold"
        },
        admissionFee:{
            type:String,
            enum: ['Deposited','Not Deposited'],
            default: "Not Deposited" 
        },
        landmark:{
            type:String
        },
        busRouteNo:{
            type:String
        },
        routeUpdated:{
            type:Boolean
        },
        stopageName:{
         type:String
        },
        finalSubmit:{
            type:Boolean,
           default:false
        },
        selected:{
            type:Boolean,
           default:false
        },
        registerDate:{
            type:Date,
            default:Date.now
        },
        year:{ 
            type:String
        },
        stream:{
            type:String
        },
        location:{
            type:String
        },
        branch:{
            type:String
        },
        registerationNo:{
            type:String,
        },
        admissionNo:{
                type:Number},
                
            assignSection:{
                type:String
            },
            assignClass:{
                type:String
            },
            assignHouse:{
                type:String
            },
            seatAlot:{
                type:Boolean
            },
            dateOfAdmission:{
                type:String
            },
            concessionType:{
                type:String
            },
            concessionInPercentage:{
                type:Number
            },
            isScheduled:{
                type:Boolean,
                default:false
            }
        
        

},{timestamps:true})

// ApplicantSchema.pre('save',counter("registeration",5))

module.exports=mongoose.model("ApplicantDetails",ApplicantSchema);