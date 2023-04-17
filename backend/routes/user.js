const express = require('express');
const {
  register,
  activateAccount,
  login,
  resendverification,
  finduser,
  sendResetPasswordCode,
  validateResetCode,
  changePassword,
  getProfile,
  updateProfilePicture,
  updateCoverPicture,
  updateDetails,
} = require('../controllers/user');
const { authUser } = require('../middlwares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/activate', authUser, activateAccount);
router.post('/login', login);
router.post('/resendverification', authUser, resendverification);
router.post('/finduser', finduser);
router.post('/sendResetPasswordCode', sendResetPasswordCode);
router.post('/validateResetCode', validateResetCode);
router.post('/changePassword', changePassword);
router.get('/getProfile/:username', authUser, getProfile);
router.put('/updateProfilePicture', authUser, updateProfilePicture);
router.put('/updateCoverPicture', authUser, updateCoverPicture);
router.put('/updateDetails', authUser, updateDetails);

module.exports = router;
