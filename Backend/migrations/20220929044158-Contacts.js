'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.addColumn('Contacts', { id: Sequelize.INTEGER });
     */
    queryInterface.addColumn('Contacts', 'lat', { type: Sequelize.STRING })
    queryInterface.addColumn('Contacts', 'lng', { type: Sequelize.STRING })
    queryInterface.addColumn('Contacts', 'address', { type: Sequelize.STRING })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn('Contacts', 'lat', {});
    queryInterface.removeColumn('Contacts', 'lng', {});
    queryInterface.removeColumn('Contacts', 'address', {});
  }
};
