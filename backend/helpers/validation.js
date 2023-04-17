const User = require('../models/User');

/** ----------- Regular Validation Email  ------------ */
exports.validationEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/);
};

/** ----------- Regular Validation length of UserName, LastName Or Password ------------ */
exports.validationLength = (text, min, max) => {
  if (text.length > max || text.length < min) {
    return false;
  }
  return true;
};

/** ----------- Regular Validation UserName If Exist and Change It  ------------ */
exports.validationUserName = async (username) => {
  let va = false;
  do {
    let check = await User.findOne({ username });
    if (check) {
      // change username from username + random number ==> exp : oussama213
      username += (+new Date() * Math.random()).toString().slice(0, 2);
      va = true;
    } else {
      va = false;
    }
  } while (va);
  return username;
};
