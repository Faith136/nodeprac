const express = require("express");
const app = express();
const cors = require("cors");

const TokenRoute = require("./Route/mpesa");

const Port = 5100; // My port number
const Hostname = "localhost";

// Middleware
app.use(cors());
app.use(express.json());

// Initializing server through express
app.listen(Port, Hostname, () => {
    console.log(`Server is running at http://${Hostname}:${Port}`);
});

app.get("/", (req, res) => {
    res.send("Mpesa programming in progress, Time to get paid");
});

app.use("/mpay", TokenRoute);

 

/**const express = require('express');

const locationController = require('../Controller/location.js');
const restaurantController = require('../Controller/Restaurant.js');
const route = express.Router();

route.get('/location', locationController.getLocation);
route.get('/restaurant', restaurantController.getRestaurant);
route.get('/restaurant/:city', restaurantController.getRestaurantByCity);

module.exports = route;

 * */