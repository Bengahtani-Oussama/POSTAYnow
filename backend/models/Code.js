const { default: mongoose } = require('mongoose');
const { ObjectId } = mongoose.Schema;

const codeSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
});
module.exports = mongoose.model('Code', codeSchema);