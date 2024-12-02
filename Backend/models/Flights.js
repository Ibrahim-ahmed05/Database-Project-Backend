module.exports = (sequelize, DataTypes) => {
    const Flight = sequelize.define("Flight", {
        flightNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true, // Primary key
        },
        flightName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        source: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        departureTime: {
            type: DataTypes.DATE, // Changed from TIME to DATE for date and time
            allowNull: false,
        },
        arrivalTime: {
            type: DataTypes.DATE, // Changed from TIME to DATE for date and time
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { // Optional: Ensure price is non-negative
                min: 0
            }
        },
    });

    return Flight;
};
