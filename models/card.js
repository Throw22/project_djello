const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    completed: {
      type: Boolean,
      required: true,
      default: false
    },
    activity: [{ type: String }]
  },
  {
    timestamps: true
  }
);

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
