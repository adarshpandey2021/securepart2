require("dotenv").config();
const Stripe_Key = process.env.SECRET_KEY_STRIPE;
const stripe = require("stripe")(Stripe_Key);
const FeeOnlineSchema = require("../../model/finance/feemangement/onlineFeeSchema");
const QuarterPaymentSchema = require("../../model/finance/feemangement/quarterpayment");
const findTotal = require("../../model/finance/feemangement/totalpayment");
const QuarterNameSchema = require("../../model/finance/feemangement/addquartername");
const FeeRefundSchema=require("../../model/finance/feemangement/feerefund")

exports.CreateSummary = async (req, res, next) => {
  const {
    admissionNo,
    name,
    classOf,
    stream,
    section,
    amountPay,
    lateFeecharge,
    dueDate,
    payDate,
    previousDue,
    totalOutstanding,
    currentDue,
  } = req.body;
  let balance = Math.round(totalOutstanding - amountPay);
  let newdata = new FeeOnlineSchema({
    admissionNo,
    name,
    classOf,
    stream,
    section,
    amountPay,
    lateFeecharge,
    dueDate,
    payDate,
    previousDue,
    totalOutstanding,
    balance,
    currentDue,
  });

  let data = await newdata.save();
  return res.json({
    status: true,
    message: "Proceed for Payment",
    data: data,
  });
};

exports.CreateCharges = async (req, res) => {
  const {
    admissionNo,
    cardNumber,
    cardExpMonth,
    cardExpYear,
    cardCVC,
    country,
    postalCode,
    amount,
    email,
  } = req.body;

  if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
    return res.status(400).send({
      status: true,
      message: "Necessary Card Details are required for  Payment",
    });
  }
  try {
    const cardToken = await stripe.tokens.create({
      card: {
        number: cardNumber,
        exp_month: cardExpMonth,
        exp_year: cardExpYear,
        cvc: cardCVC,
        address_state: country,
        address_zip: postalCode,
      },
    });

    const charge = await stripe.charges.create({
      amount: amount,
      currency: "INR",
      source: cardToken.id,
      receipt_email: email,

      description: `Stripe Charge Of Amount ${amount} for Payment`,
    });

    if (charge.status === "succeeded") {
      let data = await FeeOnlineSchema.findOne({ admissionNo });
      let balance = data.balance;
      data.status = charge.status;
      data.email = email;
      data.paymentId = charge.id;
      data.receiptUrl = charge.receipt_url;
      let savedate = data.save();

      //  let quarterdata=await QuarterPaymentSchema.findOne({
      //   applicationNo:admissionNo,
      //   quarterName,
      //  })
      let month = new Date().getMonth() + 1;

      const quarterdata = await QuarterPaymentSchema.findOne({
        startingMonth: { $lte: month },
        endingMonth: { $gte: month },
        applicationNo: admissionNo,
      });
      let quarterNumber = quarterdata.quarterNumber;
      quarterdata.paymentStatus = "Paid";
      quarterdata.amountPaid = amount;
      quarterdata.balance = balance;

      let savequarterdata = await quarterdata.save();

      let quarterNames = await QuarterNameSchema.findOne({});
      let lengthQuarter = quarterNames.numberOfQuarter;
      let quarterNo = quarterNumber + 1;
      if (quarterNo <= lengthQuarter) {
        let successivequarter = await QuarterPaymentSchema.findOne({
          quarterNumber: quarterNo,
        });
        successivequarter.previousDue = balance;
        successivequarter.save();
      }
      return res.status(200).json({
        status: true,
        message: "Payment is Successful",
        Success: charge,
      });
    } else {
      return res
        .status(400)
        .send({ Error: "Please try again later for Payment" });
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};

exports.GetPaymentDetails = async (req, res, next) => {
  try {
    let data = await FeeOnlineSchema.find({ status: "succeeded" });

    return res.json({
      message: "All details of Online Payment",
      data: data,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      status: false,
    });
  }
};
exports.GetPaymentId = async (req, res, next) => {
  try {
    const admissionNo = req.query.admissionNo;
  
    let find_data = await FeeOnlineSchema.findOne({
      status: "succeeded",
      admissionNo,
    });
    
    if (!find_data) {
      return res.status(400).json({
        status: false,
        message: "No PaymentId for this admission Number So Please Select Offline Method",
      });
    } else {
      return res.json({
        status: true,
        message: "PaymentId",
        data: find_data,
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      status: false,
    });
  }
};

exports.MakeRefunnd = async (req, res, next) => {
  try {
    const admissionNo = req.body.admissionNo;
    const chargeId = req.body.chargeId;
    const amount = req.body.amount;
     
    const refund = await stripe.refunds.create({
      charge: chargeId,
      amount: amount,
    });

    if (refund.status === "succeeded") {

      let data=await FeeRefundSchema.findOne({admissionNo})
       data.chargeId=chargeId
       data.amountRefund=amount
       data.refundid=refund.id
       data.status=refund.status
       data.amountToPay=amount
       let newdata=await data.save()
      return res.json({
        status: true,
        message: "Refund is Done",
        data: refund,
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      status: false,
    });
  }
};

exports.AddRefundDeatils=async(req,res,next)=>{
  try{
    const{
  admissionNo,
  name,
  classOf,
  section,
  stream,
  refundHead,
  refundNoteDate,
  chequeNo,
  bankAccountNo,
  bankName,
  bankBranch,
  chequeInFavourOf,
  amountToPay,
  previousTransportFee,
newTransportFee,
routeChangeIntimateDate,
refundIntimateCreatedOn,
paymentMode
    }=req.body


    if(paymentMode==="Online"){ 
      let data=await FeeRefundSchema({
        admissionNo,
    name,
    classOf,
    section,
    stream,
    refundHead,
    refundNoteDate,
    chequeNo,
    bankAccountNo,
    bankName,
    bankBranch,
    chequeInFavourOf,
    amountToPay,
    previousTransportFee,
  newTransportFee,
  routeChangeIntimateDate,
  refundIntimateCreatedOn,
  paymentMode
      })
  
      let savedata=data.save()
  return res.json({
    status:true,
    message:"Refund Details Is Added",
    data:savedata
  })
}
  else{
    let data=await FeeRefundSchema({
      admissionNo,
  name,
  classOf,
  section,
  stream,
  refundHead,
  refundNoteDate,
  chequeNo,
  bankAccountNo,
  bankName,
  bankBranch,
  chequeInFavourOf,
  amountToPay,
  previousTransportFee,
newTransportFee,
routeChangeIntimateDate,
refundIntimateCreatedOn,
paymentMode,
status:"Cheque Payment"
    })

let savedata=data.save()
return res.json({
  status:true,
  message:"Refund Details Is Added",
  data:savedata
})

  }
    }
  catch(err){
    return res.status(400).json({
      status:false,
      message:err.message
    })
  }
}

exports.GetRefundDetails=async(req,res,next)=>{
  try{

    let data=await FeeRefundSchema.find({})

    return res.json({
      data:data,
      message:"Details Of Refund"
    })
  }
  catch(err){
    return res.status(400).json({
      status:false,
      message:err.message
    })
  }
}





/////Additional API
exports.AddCustomer = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: req.body.email,
    });
    return res.status(200).json({
      customerId: customer.id,
      customerEmail: customer.email,
      status: true,
      message: `CustomerId: ${customer.id} and Customer Email ${customer.email}`,
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

exports.AddCardToCustomer = async (req, res) => {
  const {
    cardNumber,
    cardExpMonth,
    cardExpYear,
    cardCVC,
    cardName,
    country,
    postal_code,
    customerId,
  } = req.body;

  if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
    return res.status(400).json({
      status: false,
      message: "Please Provide All Necessary Details to save the card",
    });
  }
  try {
    const cardToken = await stripe.tokens.create({
      card: {
        name: cardName,
        number: cardNumber,
        exp_month: cardExpMonth,
        exp_year: cardExpYear,
        cvc: cardCVC,
        address_country: country,
        address_zip: postal_code,
      },
    });

    const card = await stripe.customers.createSource(customerId, {
      source: `${cardToken.id}`,
    });

    return res.status(200).json({
      status: true,
      card: card.id,
      message: `Card Id Is created ${card.id} of customerId ${customerId}`,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

exports.GetDetailofCustomer = async (req, res) => {
  let cards = [];
  try {
    const customerId = req.query.customerId;
    const savedCards = await stripe.customers.listSources(customerId, {
      object: "card",
    });
    const cardDetails = Object.values(savedCards.data);

    cardDetails.forEach((cardData) => {
      let obj = {
        cardId: cardData.id,
        cardType: cardData.brand,
        cardExpDetails: `${cardData.exp_month}/${cardData.exp_year}`,
        cardLast4: cardData.last4,
      };
      cards.push(obj);
    });
    return res.status(200).json({
      status: true,
      cardDetails: cards,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

exports.UpdateCard = async (req, res) => {
  const { cardName, cardExpMonth, cardExpYear, cardId, customerId } = req.body;

  if (!cardId) {
    return res.status(400).json({
      status: false,
      message: "CardID is Required to update",
    });
  }
  try {
    const card = await stripe.customers.updateSource(customerId, cardId, {
      name: cardName,
      exp_month: cardExpMonth,
      exp_year: cardExpYear,
    });
    return res.status(200).json({
      status: true,
      updatedCard: card,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

exports.DeleteCard = async (req, res) => {
  const { cardId } = req.body;
  if (!cardId) {
    return res.status(400).json({
      status: false,
      message: "CardId is required to delete Card",
    });
  }
  try {
    const deleteCard = await stripe.customers.deleteSource(customerId, cardId);
    return res.status(200).json({
      status: true,
      data: deleteCard,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

exports.CreateChargesMultipleOption = async (req, res) => {
  const { amount, cardId, oneTime, email, customerId } = req.body;
  if (oneTime) {
    const {
      cardNumber,
      cardExpMonth,
      cardExpYear,
      cardCVC,
      country,
      postalCode,
    } = req.body;

    if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
      return res.status(400).send({
        Error: "Necessary Card Details are required for One Time Payment",
      });
    }
    try {
      const cardToken = await stripe.tokens.create({
        card: {
          number: cardNumber,
          exp_month: cardExpMonth,
          exp_year: cardExpYear,
          cvc: cardCVC,
          address_state: country,
          address_zip: postalCode,
        },
      });

      const charge = await stripe.charges.create({
        amount: amount,
        currency: "INR",
        source: cardToken.id,
        receipt_email: email,
        description: `Stripe Charge Of Amount ${amount} for One Time Payment`,
      });

      if (charge.status === "succeeded") {
        return res.status(200).send({ Success: charge });
      } else {
        return res
          .status(400)
          .send({ Error: "Please try again later for One Time Payment" });
      }
    } catch (error) {
      return res.status(400).send({
        Error: error.message,
      });
    }
  } else {
    try {
      const createCharge = await stripe.charges.create({
        amount: amount,
        currency: "INR",
        receipt_email: email,
        customer: customerId,
        card: cardId,
        description: `Stripe Charge Of Amount ${amount} for Payment`,
      });
      if (createCharge.status === "succeeded") {
        return res.status(200).send({ Success: createCharge });
      } else {
        return res
          .status(400)
          .send({ Error: "Please try again later for payment" });
      }
    } catch (error) {
      return res.status(400).send({
        Error: error.message,
      });
    }
  }
};

// exports.PaymentMethod=CatchErr(
//     async(req, res,next)=>{

//         // Moreover you can take more details from user
//         // like Address, Name, etc from form
//         stripe.customers.create({
//             email: req.body.stripeEmail,
//             source: req.body.stripeToken,
//             name: 'Gourav Hammad',
//             address: {
//                 line1: 'TC 9/4 Old MES colony',
//                 postal_code: '452331',
//                 city: 'Indore',
//                 state: 'Madhya Pradesh',
//                 country: 'India',
//             }
//         })
//         .then((customer) => {

//             return stripe.charges.create({
//                 amount: 2500,     // Charing Rs 25
//                 description: 'Web Development Product',
//                 currency: 'INR',
//                 customer: customer.id
//             });
//         })
//         .then((charge) => {
//             res.send("Success")  // If no error occurs
//         })
//         .catch((err) => {
//             res.send(err)       // If some error occurs
//         });
//     }

//  )
