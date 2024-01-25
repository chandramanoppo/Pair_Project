'use strict';
const fs = require('fs/promises')
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile('./data/user.json', 'utf-8')).map(
      el => {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(el.password, salt)
        el.password =  hash
        el.createdAt = new Date()
        el.updatedAt = new Date()
        return el
      }
    )

    await queryInterface.bulkInsert('Users', data, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
