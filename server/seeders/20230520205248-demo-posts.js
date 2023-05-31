'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../db.json').posts;

    data.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Posts', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null);
  },
};
