module.exports = function( sequelize, DataTypes) {
    const Review = sequelize.define("reviews", { //what I put is the name of my table in postgres
        review: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        starRating: {
            type: DataTypes.INTEGER, //would location be a string or integer?
            notEmpty: true
        },
    })

    const User = sequelize.import('./users');

    Review.belongsTo(User) //this is DB associations
    return Review; //this is DB associations, so is line 15, 13, and 2
}