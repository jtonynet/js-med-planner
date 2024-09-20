'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
        unique: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      phone: {
        type: Sequelize.STRING(25)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(255),
        unique: true
      },
      birth_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      gender: {
        allowNull: false,
        type: Sequelize.ENUM('male', 'female', 'other', 'none', 'unspecified')
      },
      height: {
        allowNull: false,
        type: Sequelize.DECIMAL(5, 2)
      },
      weight: {
        allowNull: false,
        type: Sequelize.DECIMAL(5, 2)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('patients', ['uuid'], {
      unique: true,
      name: 'unique_patients_uuid_index'
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('patients');
  }
};