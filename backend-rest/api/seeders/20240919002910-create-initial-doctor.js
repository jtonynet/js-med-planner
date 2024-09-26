'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const passwordHash = await bcrypt.hash('lupos', 8);

    return queryInterface.bulkInsert('doctors', [{
      uuid: '21dd1c46-a6c2-44b9-a3a9-d3fa0438a12d',
      name: 'Dr. House',
      email: 'house.md@gmail.com',
      password: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('doctors', { uuid: '21dd1c46-a6c2-44b9-a3a9-d3fa0438a12d' }, {});
  }
};
