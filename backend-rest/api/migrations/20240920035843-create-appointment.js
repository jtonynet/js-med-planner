'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        allowNull: false,
        type: Sequelize.UUID,
        unique: true
      },
      patientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'patients',
          key: 'id',
        }
      },
      doctorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'doctors',
          key: 'id',
        },
      },
      description: {
        type: Sequelize.STRING(500)
      },
      startTime: {
        type: Sequelize.DATE
      },
      endTime: {
        type: Sequelize.DATE
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

    await queryInterface.addIndex('appointments', ['uuid'], {
      unique: true,
      name: 'unique_appointments_uuid_index'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('appointments');
  }
};