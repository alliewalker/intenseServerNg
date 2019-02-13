module.exports = function( sequelize, DataTypes) {
    return sequelize.define("trips", { //what I put is the name of my table in postgres
        date: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        location: {
            type: DataTypes.STRING, //would location be a string or integer?
            notEmpty: true
        },
        numberPeople: {
            type: DataTypes.INTEGER,
            notEmpty: true
        }
    })
}