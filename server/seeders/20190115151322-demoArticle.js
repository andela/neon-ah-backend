export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Articles',
    [
      {
        id: '95745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
        slug: 'how-to-be-a-10x-dev-sGNYfURm',
        title: 'Mighty God',
        content: 'Hallelujah',
        timeToRead: 1,
        isPublished: true,
        banner:
            'https://res.cloudinary.com/jesseinit/image/upload/v1548941969/photo-1476242906366-d8eb64c2f661.jpg',
        userId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
      },
      {
        id: '85745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
        slug: 'how-to-google-in-2019',
        title: 'How to google in 2019',
        content: 'ensure you know the keywords to your question',
        timeToRead: 1,
        isPublished: true,
        banner:
            'https://res.cloudinary.com/jesseinit/image/upload/v1548941969/photo-1476242906366-d8eb64c2f661.jpg',
        userId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
      },
      {
        id: '25745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
        slug: 'What-a-mighty-God',
        title: 'Mighty God',
        content: 'Hallelujah',
        timeToRead: 1,
        isPublished: true,
        banner:
            'https://res.cloudinary.com/jesseinit/image/upload/v1548941969/photo-1476242906366-d8eb64c2f661.jpg',
        userId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
      },
      {
        id: '75745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
        slug: 'how-to-say-hello-in-2019',
        title: 'How to say hello in 2019',
        content: 'open your mouth and say HELLO!',
        timeToRead: 1,
        isPublished: false,
        banner:
            'https://res.cloudinary.com/jesseinit/image/upload/v1548941969/photo-1476242906366-d8eb64c2f661.jpg',
        userId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
      }
    ],
    {}
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Articles', null, {})
};
