const express = require("express");
const router = express.Router();
const { signUp,signIn,AssignROle} = require("../controller/user");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.patch("/assignrole",AssignROle)


module.exports = router;