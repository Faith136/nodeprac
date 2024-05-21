const express = require('express');

const locationController = require('../Controller/location.js');
const restaurantController = require('../Controller/Restaurant.js');

const route = express.Router();

route.get('/location', locationController.getLocation);
route.get('/restaurant', restaurantController.getRestaurant);
route.get('/restaurant/:city', restaurantController.getRestaurantByCity);

module.exports = route;