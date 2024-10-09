const express = require('express'); 
const router = express.Router();

const { generateToken, stkpush } = require("../Controller/mpesa");

router.post("/", generateToken, stkpush);

module.exports = router;
