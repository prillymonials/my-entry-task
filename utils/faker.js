const faker = require('faker/locale/en');
const fs = require('fs');
const path = require('path');

const channels = [
  'Concert',
  'Grand Opening Ceremony',
  'Wedding',
  'Fashion',
  'Lifestyle',
  'Music',
  'Automotive',
];
const creators = ['Lady Gaga', 'Katy Perry', 'Beyonce', 'Rihanna', 'Shakira', 'Cardi B'];

let startAt = new Date();
startAt.setHours(12, 0, 0, 0);
let endAt = new Date();
endAt.setDate(startAt.getDate() + 5);
endAt.setHours(18, 0, 0, 0);

const posts = [];

posts.push({
  id: 1,
  title: 'Katy Perry Super Concert World Tour - I Kissed A Girl',
  createdBy: 'Katy Perry',
  createdAvatarUrl: '/assets/avatar03.png',
  channelName: 'Concert',
  startAt: startAt.getTime(),
  endAt: endAt.getTime(),
  description: faker.lorem.paragraphs(4, ''),
  totalUserGoing: 34,
  totalUserLikes: 7,
  isUserGoing: true,
  isUserLike: true,
});

for (let id = 2; id <= 53; id++) {
  startAt = new Date();
  startAt.setDate(startAt.getDate() + faker.random.number(31));
  startAt.setHours(faker.random.number(23), 0, 0, 0);

  endAt = new Date();
  endAt.setDate(startAt.getDate() + faker.random.number(31));
  endAt.setHours(startAt.getHours() + faker.random.number(24), 0, 0, 0);

  posts.push({
    id,
    title: faker.commerce.productName(),
    createdBy: faker.random.arrayElement(creators),
    createdAvatarUrl: `/assets/avatar0${faker.random.number({ min: 1, max: 6 })}.png`,
    channelName: faker.random.arrayElement(channels),
    startAt: startAt.getTime(),
    endAt: endAt.getTime(),
    description: faker.lorem.paragraphs(4, ''),
    totalUserGoing: 34,
    totalUserLikes: 7,
    isUserGoing: false,
    isUserLike: false,
  });
}

const comments = [];
for (let comment = 0; comment < 10; comment++) {
  comments.push({
    id: comment + 1,
    username: faker.random.arrayElement(creators),
    postAt: '1 days ago',
    avatarUrl: `/assets/avatar0${faker.random.number({ min: 1, max: 6 })}.png`,
    comment: faker.lorem.words(faker.random.number({ min: 8, max: 25 })),
  });
}

const userGoing = [];
const userLike = [];

for (let i = 0; i < 34; i++) {
  userGoing.push(`/assets/avatar0${faker.random.number({ min: 1, max: 6 })}.png`);
}

for (let i = 0; i < 7; i++) {
  userLike.push(`/assets/avatar0${faker.random.number({ min: 1, max: 6 })}.png`);
}

const result = {
  channels,
  posts,
  postDetail: {
    comments,
    userGoing,
    userLike,
  },
};

fs.writeFileSync(
  path.resolve(__dirname, '..', 'src/utils/mock', 'database.json'),
  JSON.stringify(result),
);

module.exports = result;
