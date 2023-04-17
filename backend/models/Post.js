const { default: mongoose } = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    type: {
      type: String,
      anum: ['profilePicture', 'coverPicture', null],
      default: null,
    },
    text: {
      type: String,
    },
    images: {
      type: Array,
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    postBackground: {
      type: String,
    },
    comment: [
      {
        comment: {
          type: String,
        },
        image: {
          type: String,
        },
        commentBy: {
          type: ObjectId,
        },
        commentAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', postSchema);
