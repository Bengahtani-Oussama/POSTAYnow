const {
  validationEmail,
  validationLength,
  validationUserName,
} = require('../helpers/validation');
const User = require('../models/User');
const Post = require('../models/Post');
const Code = require('../models/Code');
const bcrypt = require('bcrypt');
const { generateToken } = require('../helpers/tokens');
const { sendVerificationEmail, sendResetCode } = require('../helpers/mailer');
const jwt = require('jsonwebtoken');
const generateCode = require('../helpers/generateCode');

/** ----------- Register Function  ------------ */
exports.register = async (req, res) => {
  try {
    /** ----------- Destruct user information From body  ------------ */
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      gender,
      bYear,
      bMonth,
      bDay,
    } = req.body;

    /** ----------- Test Validation Email  ------------ */
    if (!validationEmail(email)) {
      return res.status(400).json({ message: 'email not Valid' });
    }

    /** ----------- Test Validation Length Of FirstName, LastName and Password  ------------ */
    if (!validationLength(firstName, 3, 30)) {
      return res.status(400).json({
        message: 'The first name must be between 3 and 30 characters',
      });
    }
    if (!validationLength(lastName, 3, 30)) {
      return res.status(400).json({
        message: 'The last name must be between 3 and 30 characters',
      });
    }
    if (!validationLength(password, 6, 30)) {
      return res.status(400).json({
        message: 'The password must be at least 6 characters',
      });
    }

    /** ----------- Test if Email exist ------------ */
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: 'This email address already exists, try withe different email',
      });
    }

    const cryptPassword = await bcrypt.hash(password, 12);

    let tempUserName = firstName + lastName;
    let newUserName = await validationUserName(tempUserName);

    // console.log(newUserName);

    // return;
    const checkUserName = await User.findOne({ username });
    if (checkUserName) {
      tempUserName = +Math.floor(Math.random());
    }

    /** ----------- send user information for register  ------------ */
    const user = await new User({
      firstName,
      lastName,
      username: newUserName,
      email,
      password: cryptPassword,
      gender,
      bYear,
      bMonth,
      bDay,
    }).save();
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      '7d'
    );

    /** ----------- send to mailer.js as prop to redirect after verified email ------------ */
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.firstName, url);

    /** ----------- send TOKEN to FRONTEND after verified email  ------------ */
    const token = generateToken({ id: user._id.toString() }, '30d');

    res.send({
      id: user._id,

      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      picture: user.picture,
      token: token,
      verified: user.verified,
      message:
        'Register Success! Please check your email to activate our account',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/** ----------- Register Function  ------------ */
exports.activateAccount = async (req, res) => {
  try {
    const validuser = req.user.id;
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);

    /** ----------- check if the same user of the same token   ------------ */
    if (validuser !== user.id) {
      return res.status(400).json({
        message:
          'Sorry! you dont have authorization to complete this operation.',
      });
    }

    /** ----------- check account if already activated   ------------ */
    const check = await User.findById(user.id);
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: 'This account is already activated!' });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: 'Account has been activate successfully!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/** ----------- Login Function  ------------ */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'This Email Address Is Not Connected To An Account' });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res
        .status(400)
        .json({ message: 'Invalid Credentials! Please Try Again' });
    }
    /** ----------- send TOKEN to FRONTEND after verified email  ------------ */
    const token = generateToken({ id: user._id.toString() }, '30d');

    res.send({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      picture: user.picture,
      token: token,
      verified: user.verified,
      message: 'Login Success! Enjoy',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resendverification = async (req, res) => {
  try {
    // console.log(req);
    const id = req.user.id;
    const user = await User.findById(id);

    if (user.verified === true) {
      return res
        .status(400)
        .json({ message: 'This Account already verified!' });
    }

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      '7d'
    );

    /** ----------- send to mailer.js as prop to redirect after verified email ------------ */
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.username, url);

    return res.status(200).json({
      message: 'The Email verification link has been sent to your email',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** ----------- Find User Function => Reset Password Code ------------ */
exports.finduser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email }).select('-password');

    if (!user) {
      return res.status(400).json({ message: 'Account does not exist!' });
    }
    res.status(200).json({
      username: user.username,
      email: user.email,
      picture: user.picture,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** ----------- Send Reset Password Code User Function => Reset Password Code ------------ */
exports.sendResetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select('-password');

    await Code.findOneAndRemove({ user: user._id });
    const code = generateCode(6);

    const saveCode = await new Code({
      code,
      user: user._id,
    }).save();

    sendResetCode(user.email, user.username, code);
    return res.status(200).json({
      message: 'Email Reset Code has been sent to your email',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** ----------- Validate Reset Code User Function => Reset Password Code ------------ */
exports.validateResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email }).select('-password');

    const DbCode = await Code.findOne({ user: user._id });

    if (DbCode.code !== code) {
      return res.status(400).json({ message: 'Verification Code is wrong' });
    }

    res.status(200).json({ message: 'ok' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** ----------- Change Password Function => Reset Password Code ------------ */
exports.changePassword = async (req, res) => {
  const { email, password } = req.body;

  const cryptPassword = await bcrypt.hash(password, 12);

  await User.findOneAndUpdate({ email }, { password: cryptPassword });

  return res.status(200).json({ message: 'ok' });
};

/** ----------- Get User Information To Use In Profile ------------ */
exports.getProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await User.findOne({ username }).select('-password');

    if (!profile) {
      return res.json({ ok: false });
    }

    const posts = await Post.find({ user: profile._id })
      .populate('user')
      .sort({ createdAt: -1 });
    res.json({ ...profile.toObject(), posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** ----------- Update Profile Picture ------------ */
exports.updateProfilePicture = async (req, res) => {
  try {
    const { url } = req.body;
    await User.findByIdAndUpdate(req.user.id, {
      picture: url,
    });
    res.json(url);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** ----------- Update Cover Picture ------------ */
exports.updateCoverPicture = async (req, res) => {
  try {
    const { url } = req.body;
    await User.findByIdAndUpdate(req.user.id, {
      cover: url,
    });
    res.json(url);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** ----------- Update Details ------------ */
exports.updateDetails = async (req, res) => {
  try {
    const { infos } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { details: infos },
      { new: true }
    );
    res.json(updated.details);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
