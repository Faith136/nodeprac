const express = require('express');
const route = require('./Route/Index');
const cors = require('cors');
require("dotenv").config();
const axios = require("axios");

const app = express();
const Port = 5173; //my port number
const Hostname = "localhost";

//initiaizing my server through express
app.listen(Port, Hostname, () => {
    console.log(`Server is running at ${Hostname}: ${Port}`)})


// Middleware setup
app.use(cors());
app.use(express.json()); // Corrected: Call express.json() as a function
app.use(express.urlencoded({ extended: true }));

console.log(process.env.WEATHER_API_KEY);

//Accepting and directing all the requests
app.use('/', route);



app.get("/", (req, res) => {
    res.send("<h1>Hi Beautiful FAY!</h1>")
})

//midddleware function to generate token
const generateToken = async(req, res, next) => {
    const secret = process.env.MPESA_CONSUMER_SECRET
    const consumer = process.env.MPESA_CONSUMER_KEY
    const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");

    await axios
        .get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
            headers: {
                authorization: `Basic ${auth}`
            },
        }).then((response) => {
            //console.log(response.data.access_token);
            token = response.data.access_token
            next();
        }).catch((err) => {
            console.log(err)

            
        });
};

//app.get("/token", (req, res) => {
//   generateToken();
//})
app.post("/stk", generateToken, async(req, res) => {
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

    await axios.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
            BusinessShortCode: process.env.MPESA_PAYBILL,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: `254${phone}`,
            PartyB: process.env.MPESA_PAYBILL,
            PhoneNumber: `254${phone}`,
            CallBackURL: "https://mydomain.com/pat",
            AccountReference: `254${phone}`,
            TransactionDesc: "Test"
        }, {
            headers: {
                authorization: `Bearer ${token}`,
            },

        }
    ).then((data) => {
        console.log(data.data)
        res.status(200).json(data.data)
    }).catch((err) => {
        console.log(err.message)
        res.status(400).json(err.message);
    });
});






/*response body: {    
   "MerchantRequestID": "29115-34620561-1",    
   "CheckoutRequestID": "ws_CO_191220191020363925",    
   "ResponseCode": "0",    
   "ResponseDescription": "Success. Request accepted for processing",    
   "CustomerMessage": "Success. Request accepted for processing"
}*/