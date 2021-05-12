const express = require("express");
const router = express.Router();
const {
  AddCustomer,
  AddCardToCustomer,
  GetDetailofCustomer,
  UpdateCard,
  DeleteCard,
  CreateCharges,
  CreateSummary,
  GetPaymentDetails,
  MakeRefunnd,
  AddRefundDeatils,
  GetPaymentId,
  GetRefundDetails
} = require("../controller/Paymentmethod/payment");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Stripe Hello World!",
  });
});

// Create a new customer for stripe
router.post("/newCustomer", AddCustomer);

// Add a new card of the customer
router.post("/addNewCard", AddCardToCustomer);

// Get List of all saved card of the customers
router.get("/viewAllCards", GetDetailofCustomer);

// Update saved card details of the customer
router.post("/updateCardDetails", UpdateCard);

// Delete a saved card of the customer
router.post("/deleteCard", DeleteCard);

// Create a payment charge
router.post("/createCharge", CreateCharges);

router.post("/createSummary", CreateSummary);

router.get("/getonlinedetails", GetPaymentDetails);

router.get("/getpaymnetId",GetPaymentId)
router.post("/makerefund",MakeRefunnd)
router.post("/addrefunddetails",AddRefundDeatils)

router.get("/getrefunddeatils",GetRefundDetails)

  

module.exports = router;
