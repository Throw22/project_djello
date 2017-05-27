const express = require('express');
const app = express();

// ----------------------------------------
// Body Parser
// ----------------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// ----------------------------------------
// Sessions/Cookies
// ----------------------------------------
// const cookieSession = require('cookie-session');
//
// app.use(
//   cookieSession({
//     name: 'session',
//     keys: [process.env.SESSION_SECRET || 'asdf1234567890qwer']
//   })
// );
//
// app.use((req, res, next) => {
//   app.locals.session = req.session;
//   next();
// });

// ----------------------------------------
// Mongoose
// ----------------------------------------
const mongoose = require('mongoose');
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require('./mongo')().then(() => next());
  }
});

const models = require('./models');
const User = mongoose.model('User');
const Board = mongoose.model('Board');
const List = mongoose.model('List');
const Card = mongoose.model('Card');

// ----------------------------------------
// Services
// ----------------------------------------
// const authService = require('./services/auth');
// const User = require('./models').User;
//
// app.use(
//   authService({
//     findUserByEmail: email => {
//       return User.findOne({ email: email });
//     },
//     findUserByToken: token => {
//       return User.findOne({ token: token });
//     },
//     validateUserPassword: (user, password) => {
//       return user.validatePassword(password);
//     }
//   })
// );

// ----------------------------------------
// Routes
// ----------------------------------------

app.post('/api/v1/login', (req, res) => {
  console.log('Server hit to find user:', req.body.username);
  let username = req.body.username;

  User.findOne({ username })
    .populate({
      path: 'boards',
      model: 'Board',
      populate: {
        path: 'lists',
        model: 'List',
        populate: {
          path: 'cards',
          model: 'Card',
          populate: {
            path: 'members',
            model: 'User',
            select: ['username', 'photo']
          }
        }
      }
    })
    .then(user => {
      res.status(200).json(user);
    });
});

app.get('/api/v1/boards/:title', (req, res) => {
  let title = req.params.title;
  console.log('Server hit to find:', title);
  Board.findOne({ title })
    .populate({
      path: 'lists',
      model: 'List',
      populate: {
        path: 'cards',
        model: 'Card',
        populate: {
          path: 'members',
          model: 'User',
          select: ['username', 'photo']
        }
      }
    })
    .then(board => {
      console.log('Found board:', board);
      res.send(board);
    });
});

app.get('/api/v1/users/:username', (req, res) => {
  let username = req.params.username;

  User.findOne({ username })
    .populate({
      path: 'boards',
      model: 'Board'
    })
    .then(user => {
      const currentUser = {
        username: user.username,
        photo: user.photo,
        token: user.token,
        boards: []
      };

      user.boards.forEach(board => {
        currentUser.boards.push(board.title);
      });

      res.send(currentUser);
    });
});

// ----------------------------------------
// Server
// ----------------------------------------
const port = process.env.PORT || process.argv[2] || 5000;
const host = 'localhost';

let args;
process.env.NODE_ENV === 'production' ? (args = [port]) : (args = [port, host]);

args.push(() => {
  console.log(`Listening: http://${host}:${port}\n`);
});

// If we're running this file directly
// start up the server
if (require.main === module) {
  app.listen.apply(app, args);
}

// ----------------------------------------
// Error Handling
// ----------------------------------------
app.use('/api', (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.stack) {
    err = err.stack;
  }
  res.status(500).json({ error: err });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.stack) {
    err = err.stack;
  }
  res.status(500).render('errors/500', { error: err });
});

module.exports = app;
