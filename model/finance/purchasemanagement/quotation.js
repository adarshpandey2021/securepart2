const mongoose=require('mongoose');

const quotation=new mongoose.Schema({
    reference:{
        type:String
    },
    quotataionorderDate:{
        type:String
    },
    quotataionvendor:{
        type:String
    },
    quotataionscheduleDate:{
        type:String
    },
    purchaseRepresentative:{
        type:String
    },
    sourceDocument:{
        type:String
    },
    untaxed:{
        type:Number
    },
    total:{
        type:Number
    },
status:{   
    type:String,
    enum:['Locked','Purchase Order'],
    default:'Purchase Order'
}
})
const purchaseAgreement=new mongoose.Schema({
    agreementvendor:{
        type:String
    },
   agreementType:{
        type:String
    },
    agreementpurchaseRepresentative:{
        type:String
    },
    deliveryTime:{
        type:String
    },
    agreementproduct:{
        type:String
    },
    agreementquantity:{
        type:Number
   },
   agreementunitPrice:{
    type:Number
},
  billUploads:{
      type:String
  },
  status:{
      type:String,
      enum:["Confirmed","Pending"],
      default:"Pending"
  }
})
const RequestQuotation=new mongoose.Schema({
    vendor:{
        type:String
    },
    quotation:[quotation],
    vendorRef:{
        type:String
    },
    purchaseAgreement:[purchaseAgreement],
    orderDate:{
        type:String
    },
    product:{
        type:String
    },
    scheduleDate:{
        type:String
    },
    quantity:{
        type:Number
    },
    unitPrice:{
        type:Number
    },
    taxes:{
        type:Number
    },
    subtotal:{
        type:Number
    },
    description:{
        type:String
        
    }

})

module.exports=mongoose.model('RequestQuotation',RequestQuotation)