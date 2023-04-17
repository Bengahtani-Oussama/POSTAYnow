const fs = require('fs');

module.exports = async function (req, res, next) {
  // console.log(req.files);
  try {
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).json({ message: 'No file selected' });
    }

    let files = Object.values(req.files).flat();

    files.forEach((file) => {
      if (
        file.mimetype !== 'image/jpeg' &&
        file.mimetype !== 'image/jpg' &&
        file.mimetype !== 'image/gif' &&
        file.mimetype !== 'image/png'
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: 'Unsupported format!' });
      }

      if (file.size > 1024 * 1024 * 4) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({
          message: 'Size file too large, please chose file less then 4MB',
        });
      }
    });
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
