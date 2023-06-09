const { default: mongoose } = require('mongoose');

const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'first name is required'],
      trim: true,
      text: true,
    },
    lastName: {
      type: String,
      required: [true, 'last name is required'],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, 'user name is required'],
      trim: true,
      text: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    picture: {
      type: String,
      trim: true,
      default:
        'https://res.cloudinary.com/df9iy1rz7/image/upload/v1679812763/user_avater_men_bhnmji.png',
    },
    cover: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, 'gender is required'],
      trim: true,
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: ObjectId,
          ref: 'User',
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: [
          'Single',
          'In a relationship',
          'Married',
          'Divorced',
          'Not interested',
          'Other',
        ],
      },
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
      youtube: {
        type: String,
      },
      tiktok: {
        type: String,
      },
      twitter: {
        type: String,
      },
      github: {
        type: String,
      },
    },

    savePosts: [
      {
        post: {
          type: ObjectId,
          ref: 'Post',
        },
        savedAt: {
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

module.exports = mongoose.model('User', userSchema);
