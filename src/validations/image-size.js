const imageValid = (file) => {
  const maxImageSize = 10 * 1024 * 1024;

  const originalName = file?.originalname;
  const buffer = file?.buffer;

  return originalName != null && buffer != null && Buffer.byteLength(buffer) <= maxImageSize;
}

module.exports = {
  imageValid
}