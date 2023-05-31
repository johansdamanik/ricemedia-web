'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../db.json').users;

    data.forEach((el) => {
      el.password = hashPassword(el.password)
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Users', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null);
  },
};
