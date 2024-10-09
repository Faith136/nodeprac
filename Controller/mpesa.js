const Axios = require('axios');
require("dotenv").config();

// Middleware function to generate token 
const generateToken = async (req, res, next) => {
    const secret = process.env.MPESA_CONSUMER_SECRET;
    const consumer = process.env.MPESA_CONSUMER_KEY;
    const auth = Buffer.from(`${consumer}:${secret}`).toString("base64");

    try {
        const response = await Axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
            headers: {
                authorization: `Basic ${auth}`
            },
        });

        const token = response.data.access_token; // Define token with let or const
        req.token = token; // Pass the token to the request object
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send("Error generating token"); // Send response in case of error
    }
};

const stkpush = async (req, res) => {
    const phone = req.body.phone.substring(1);
    const amount = req.body.amount;

    const date = new Date();
    const timestamp =
        date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2);

    const shortcode = process.env.MPESA_PAYBILL;
    const passkey = process.env.MPESA_PASSKEY;

    const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");

    try {
        const response = await Axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
                BusinessShortCode: shortcode,
                Password: password,
                Timestamp: timestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: amount,
                PartyA: `254${phone}`,
                PartyB: shortcode,
                PhoneNumber: `254${phone}`,
                CallBackURL: "https://mydomain.com/pat", // Ensure this URL is set correctly
                AccountReference: `254${phone}`,
                TransactionDesc: "Test"
            }, {
                headers: {
                    authorization: `Bearer ${req.token}`, // Access token from req
                },
            }
        );

        console.log(response.data);
        res.status(200).json(response.data);
    } catch (err) {
        console.log(err.message);
        res.status(400).json(err.message);
    }
};

module.exports = { generateToken, stkpush };



