const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const post = await Post(req.body).save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const post = await Post.find()
      .populate('user', 'firstName lastName  username  gender picture')
      .sort({ createdAt: -1 }); // to sort posts from new to old

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
