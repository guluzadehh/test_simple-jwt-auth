const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const errors = require('../utils/errors')
const logger = require('../config/logger')

function convertToAPIError(err) {
  if (err.name === 'SequelizeValidationError') {
    const details = err.errors.reduce((obj, error) => {
      return { ...obj, [error.path]: error.message }
    }, {})

    return new errors.ValidationError(details)
  }

  logger.error(err);

  return new errors.InternalError()
}

const generateImageName = (originalName) => {
  return `${crypto.randomBytes(16).toString('hex')}${path.extname(originalName)}`
}

const saveImage = (imagePath, imageBuffer) => {
  if (imageBuffer == null) return;

  const uploadDir = path.join(__dirname, '/../uploads/');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const out = path.join(uploadDir, imagePath);
  fs.writeFileSync(out, imageBuffer);

  return out;
}

module.exports = {
  convertToAPIError, saveImage, generateImageName
}
