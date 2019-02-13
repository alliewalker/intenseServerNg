module.exports = function( sequelize, DataTypes) {
    return sequelize.define("user", { //what I put is the name of my table in postgres
        email: {
            type: DataTypes.STRING,
            notEmpty: true,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        passwordhash: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        userRole: {               //IN MY CONTROLLER ASSIGN VALUE TO THIS
            type: DataTypes.STRING,
        },
        adminStatus: DataTypes.BOOLEAN
    })
}

