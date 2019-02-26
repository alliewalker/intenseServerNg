let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let Trip = sequelize.import("../models/trip");

//up above are called variables

/****Trips ******* */
router.post("/make", (req, res) => { //ok to receive a post request. On post you can create or send data to server
    console.log(req.body.trip)
    let date = req.body.trip.date;
    let location= req.body.trip.location;
    let numberPeople = req.body.trip.numberPeople;
    Trip.create({
        date: date,
        location: location,
        numberPeople: numberPeople
    }).then(
        createSuccess = (trip) => {
            res.json({
                created: trip,
                message: "Hello, there!",
            })
        },
        createError = (err) => {
            res.status(500).send(err.message)
        }
    )
})

router.get("/read", (req, res) => {
    // console.log('getting there') 
//console.log(req.user.dataValues.id)

Trip.findAll()
    .then( //.then passes any info found to the 1st function if found or 2nd function if there is an error
        getSuccess = (allTrips) => {  //if it can be found in the database then its a success
            res.status(200).json({
                trip: allTrips,
                message: "Hello, there!"
            })
        },
        createError = (err) => { //will return with an error if it cant be found in the database
            res.status(500).send(err.message)
        }
    )
})

router.put("/promote/:id", function (req, res) {
    let input = req.params.id;
    let date = req.body.trip.date;
    let location= req.body.trip.location;
    let numberPeople = req.body.trip.numberPeople;
    //console.log(req.body)
    Trip.update({
        date: date,
        location: location,
        numberPeople: numberPeople
    }, { where: { id: input }}) //update the trip with the up above info which id is = to the input
    .then(
        function createSuccess(trip) {
            res.json({
                updated: trip,
                message: "Hello, there!",
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

router.delete("/remove/:id", function (req, res) {
    let input = req.params.id;
    Trip.destroy({ where: { id: input }}) //delete the trip with the up above info which id is = to the input
    .then(
        function createSuccess(trip) {
            res.json({
                updated: trip,
                message: "Hello, there!",
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

module.exports = router