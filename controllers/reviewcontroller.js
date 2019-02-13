let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let Review = sequelize.import("../models/review");


//up above are called variables


/****Reviews ******* */
router.post("/make", function (req, res) { //ok to receive a post request. On post you can create or send data to server
    let date = req.body.trip.date;
    let location= req.body.trip.location;
    let numberPeople = req.body.trip.numberPeople;
    //console.log(req.body)
    Review.create({
        date: date,
        location: location,
        numberPeople: numberPeople
    }).then(
        function createSuccess(review) {
            res.json({
                created: review,
                message: "Hello, there!",
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

router.get("/read", function (req, res) { 
console.log(req.user.dataValues.id)
console.log("kjhgfdcvbnkjuytrfdcvbnmkJHGFDSDFGHJKJHGFDFGHJKJHGFRERTYUIJUHYGFDFGHJKLKJHG")
Review.findAll()
    .then( //.then passes any info found to the 1st function if found or 2nd function if there is an error
        function getSuccess(awesometrip) {  //if it can be found in the database then its a success
            res.json({
                review: awesometrip,
                message: "Hello, there!",
            })
        },
        function createError(err) { //will return with an error if it cant be found in the database
            res.send(500, err.message)
        }
    )
})

router.put("/promote/:id", function (req, res) {
    let input = req.params.id;
    let date = req.body.trip.date;
    let location= req.body.trip.location;
    let numberPeople = req.body.trip.numberPeople;
    //console.log(req.body)
    Review.update({
        date: date,
        location: location,
        numberPeople: numberPeople
    }, { where: { id: input }}) //update the review with the up above info which id is = to the input
    .then(
        function createSuccess(review) {
            res.json({
                updated: review,
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
    Review.destroy({ where: { id: input }}) //delete the review with the up above info which id is = to the input
    .then(
        function createSuccess(review) {
            res.json({
                updated: review,
                message: "Hello, there!",
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

module.exports = router