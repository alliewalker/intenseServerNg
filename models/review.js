module.exports = function( sequelize, DataTypes) {
    return sequelize.define("reviews", { //what I put is the name of my table in postgres
        review: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        starRating: {
            type: DataTypes.INTEGER, //would location be a string or integer?
            notEmpty: true
        },
    })
}