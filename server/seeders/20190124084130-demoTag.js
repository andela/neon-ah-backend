export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Tags', [{
    id: '00143c60-7b1a-11e8-9c9c-2d42b21b1a3e',
    name: 'politics'
  },
  {
    id: '00155c60-6b1a-11e8-9c9c-2d42b21b1a3e',
    name: 'technology'
  },
  {
    id: '00126d60-6b1a-11e8-9c9c-2d42b21b1a3e',
    name: 'music'
  }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Tags', null, {})
};
