const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const md5 = require('md5');
const uuid = require('uuid/v4');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    token: {
      type: String,
      unique: true
    },
    photo: {
      type: String
    },
    boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }]
  },
  {
    timestamps: true
  }
);

UserSchema.plugin(uniqueValidator);

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.hashedPassword);
};

UserSchema.pre('save', function(next) {
  this.token = md5(`${this.username}${uuid()}`);
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
