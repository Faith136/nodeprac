const Restaurant = require("../Models/restaurant.json")

exports.getRestaurant = (req, res) => {
    res.status(200).json({
        message: "Restaurants Fetched Successfully",
        restaurant: Restaurant
    })
}

exports.getRestaurantByCity = (req, res) => {
    const { city } = req.params;
    const filterRestaurant = Restaurant.filter(i => i.city_name == city);

    res.status(200).json({
        message: "Restaurants Fetched Successfully By City",
        restaurant: Restaurant
    })
}