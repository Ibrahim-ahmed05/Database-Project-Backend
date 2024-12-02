module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    bookingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Flights',  // Should be the Sequelize model name, not the table name
        key: 'flightNumber',
      },
    },
    PassportNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Passengers',  // Should be the Sequelize model name, not the table name
        key: 'PassportNumber',
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // Define the relationships (associating with other models)
  Booking.associate = (models) => {
    // Association with the Flight model
    Booking.belongsTo(models.Flight, {   // Ensure 'Flight' is the correct model name
      foreignKey: 'flightNumber',
      targetKey: 'flightNumber',
      as: 'flight',  // Alias for the relationship; must match the include alias in your query
      onDelete: 'CASCADE',
    });

    // Association with the Passenger model
    Booking.belongsTo(models.Passenger, {  // Ensure 'Passenger' is the correct model name
      foreignKey: 'PassportNumber',
      targetKey: 'PassportNumber',
      as: 'passenger',  // Alias for the relationship; must match the include alias in your query
      onDelete: 'CASCADE',
    });
  };

  return Booking;
};
