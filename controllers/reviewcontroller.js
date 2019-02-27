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
    
    console.log(req.body)
    Review.create({
        review: review,
        starRating: starRating,
        userId: req.user.id
    }).then(
        function createSuccess(review) {
            res.json({
                created: review,
                message: "Hello, there!"
            })
        },
        function createError(error) {
            res.send(500, error.errors[0].message || error.message)
        }
    )
})

router.get("/read", function (req, res) { 
<<<<<<< HEAD
//console.log(req.user.dataValues.id)
=======
    console.log('getting reviews')
>>>>>>> 527e4e716cfa643fd3df57e08aca2df2e0bb85ca
    if(req.user.isAdmin) {
        Review.findAll()
            .then( //.then passes any info found to the 1st function if found or 2nd function if there is an error
                function getSuccess(reviews) {  //if it can be found in the database then its a success
                    res.json({
                        reviews,
                        message: "Hello, there!",
                        order: ['createdAt', 'ASC']
                    })
                },
                function createError(err) { //will return with an error if it cant be found in the database
                    res.send(500, err.errors[0].message || err.message)
                }
            )
    } else {
        console.log('getting reviews for user', req.user.id)
        Review.findAll({where: {userId: req.user.id}}).then((reviews) => {
            res.status(200).json({ reviews })
        }).catch((err) => {
            console.error(err)
            res.status(500).send(err.errors ? err.errors[0].message : err.message)
        })
    }
})

router.put("/update/:id", function (req, res) {
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
        function createError(error) {
            res.status(500).send(error.message)
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
        function createError(error) {
            res.status(500).send(error.message)
        }
    )
})

module.exports = router