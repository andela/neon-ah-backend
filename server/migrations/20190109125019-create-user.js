/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      bio: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      following: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
