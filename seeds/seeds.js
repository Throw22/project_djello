var faker = require('faker');
var voca = require('voca');

module.exports = () => {
  // ----------------------------------------
  // Create Users
  // ----------------------------------------
  console.log('Creating Users');
  var users = [];
  for (let i = 0; i < 20; i++) {
    var user = new User({
      username: faker.name.firstName() + faker.name.lastName(),
      password: 'password',
      photo: faker.image.avatar()
    });
    users.push(user);
  }

  // ----------------------------------------
  // Create Boards
  // ----------------------------------------
  console.log('Creating Boards');
  var boards = [];
  for (let i = 0; i < 40; i++) {
    var board = new Board({
      title: (faker.address.streetName() + ' ' + i.toString()).replace(
        /\s/g,
        ''
      )
    });
    boards.push(board);
  }

  // ----------------------------------------
  // Create Lists
  // ----------------------------------------
  console.log('Creating Lists');
  var lists = [];
  for (let i = 0; i < 80; i++) {
    var list = new List({
      title: faker.address.stateAbbr() + ' ' + i.toString(),
      description: faker.company.catchPhrase()
    });
    lists.push(list);
  }

  // ----------------------------------------
  // Create Cards
  // ----------------------------------------
  console.log('Creating Cards');
  var cards = [];
  for (let i = 0; i < 160; i++) {
    var card = new Card({
      title: faker.company.companyName(),
      description: faker.hacker.phrase(),
      completed: false
    });
    cards.push(card);
  }

  // ----------------------------------------
  // Add Boards to Users
  // ----------------------------------------
  console.log('Adding Boards to Users');
  for (let i = 0; i < users.length; i++) {
    users[i].boards.push(boards[i]._id, boards[i + 20]._id);
  }

  // ----------------------------------------
  // Add Lists to Boards
  // ----------------------------------------
  console.log('Adding Lists to Boards');
  for (let i = 0; i < boards.length; i++) {
    boards[i].lists.push(lists[i]._id, lists[i + 40]._id);
  }

  // ----------------------------------------
  // Add Cards to Lists
  // ----------------------------------------
  console.log('Adding Cards to Lists');
  for (let i = 0; i < lists.length; i++) {
    lists[i].cards.push(cards[i]._id, cards[i + 80]._id);
  }

  // ----------------------------------------
  // Add Users to Cards
  // ----------------------------------------
  console.log('Adding Users to Cards');
  let d = new Date();
  for (let i = 0; i < cards.length; i++) {
    if (i < 20) {
      cards[i].members.push(users[i]._id);
      cards[i].activity = [
        `${users[i].username} created this card at ${d.toString()}`
      ];
    } else if (i < 40) {
      cards[i].members.push(users[i - 20]._id);
    } else if (i < 60) {
      cards[i].members.push(users[i - 40]._id);
    } else if (i < 80) {
      cards[i].members.push(users[i - 60]._id);
    } else if (i < 100) {
      cards[i].members.push(users[i - 80]._id);
    } else if (i < 120) {
      cards[i].members.push(users[i - 100]._id);
    } else if (i < 140) {
      cards[i].members.push(users[i - 120]._id);
    } else if (i < 160) {
      cards[i].members.push(users[i - 140]._id);
    }
  }

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log('Saving models');
  var promises = [];
  [users, boards, lists, cards].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};
