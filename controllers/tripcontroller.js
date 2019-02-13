let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let Trip = sequelize.import("../models/trip");


//up above are called variables


/****Trips ******* */
router.post("/make", function (req, res) { //ok to receive a post request. On post you can create or send data to server
    let date = req.body.trip.date;
    let location= req.body.trip.location;
    let numberPeople = req.body.trip.numberPeople;
    //console.log(req.body)
    Trip.create({
        date: date,
        location: location,
        numberPeople: numberPeople
    }).then(
        function createSuccess(trip) {
            res.json({
                created: trip,
                message: "Hello, there!",
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

router.get("/read", function (req, res) { 
//console.log(req.user.dataValues.id)
//console.log("kjhgfdcvbnkjuytrfdcvbnmkJHGFDSDFGHJKJHGFDFGHJKJHGFRERTYUIJUHYGFDFGHJKLKJHG")
Trip.findAll()
    .then( //.then passes any info found to the 1st function if found or 2nd function if there is an error
        function getSuccess(awesometrip) {  //if it can be found in the database then its a success
            console.log("###########", awesometrip)
            res.status(200).json({
                trip: awesometrip,
                message: "Hello, there!"
            })
        },
        function createError(err) { //will return with an error if it cant be found in the database
            res.send(500, err.message)
        }
    )
})

// router.get("/read", (req, res) => {
//     Trip.findAll()
//     .then(awesomeTrip => {
//         res.status(200).json({awesomeTrip: awesomeTrip})
//     })
//     .catch(err => res.status(500).json({error: err}))
// })

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