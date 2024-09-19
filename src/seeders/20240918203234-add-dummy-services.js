'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Services', [
      {
        id: 1,
        name: "Standard Shipping",
        description: "Basic shipping service with average delivery time.",
        price: 5.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Express Shipping",
        description: "Faster delivery service with premium charges.",
        price: 15.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "Gift Wrapping",
        description: "Special gift wrapping service for special occasions.",
        price: 2.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: "Installation Service",
        description: "Professional installation service for electronic devices.",
        price: 30.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Services', null, {});

  }
};
