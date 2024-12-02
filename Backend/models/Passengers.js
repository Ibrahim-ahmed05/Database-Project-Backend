const { DataTypes } = require("sequelize");

// Example: In your Passenger model (models/Passenger.js or similar)
module.exports = (sequelize, DataTypes) => {
    const Passenger = sequelize.define('Passenger', {
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PassportNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        ContactNumber: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,  // Disable timestamps (createdAt, updatedAt)
    });

    return Passenger;
};

