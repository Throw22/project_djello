const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const BoardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    lists: [{ type: Schema.Types.ObjectId, ref: 'List' }]
  },
  {
    timestamps: true
  }
);

BoardSchema.plugin(uniqueValidator);

// Lifecycle hook for delete board, clear it from all users?
// BoardSchema.pre('save', function(next) {
//   this.token = md5(`${this.username}${uuid()}`);
//   next();
// });

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;
