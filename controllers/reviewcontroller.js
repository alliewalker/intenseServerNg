let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let Review = sequelize.import("../models/review");


//up above are called variables


/****Reviews ******* */
router.post("/make", function (req, res) { //ok to receive a post request. On post you can create or send data to server
    console.log(req.body)
    let review = req.body.review.review;
    let starRating= req.body.review.starRating;
    
    //console.log(req.body)
    Review.create({
        review: review,
        starRating: starRating,
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
//console.log(req.user.dataValues.id)
    Review.findAll()
        .then( //.then passes any info found to the 1st function if found or 2nd function if there is an error
            function getSuccess(awesometrip) {  //if it can be found in the database then its a success
                res.json({
                    review: awesometrip,
                    message: "Hello, there!",
                })
            },
            function createError(err) { //will return with an error if it cant be found in the database
                res.status(500).send(err.message)
            }
        )
    })

router.put("/promote/:id", function (req, res) {
    let input = req.params.id;
    let review = req.body.review.review;
    let starRating= req.body.review.starRating;
    //console.log(req.body)
    Review.update({
        review: review,
        starRating: starRating,
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