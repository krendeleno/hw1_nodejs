const db = require('../../entities/Database');
const fs = require('fs');
const path = require('path');
const { imageFolder } = require('../../config');
const { NotFoundApiError } = require('../../validators/errors/ApiError');

module.exports = async (req, res, next) => {
  const imageId = req.params.id;
  const img = db.findOne(imageId);
  try {
    if (!img) {
      throw new NotFoundApiError();
    } else {
      res.setHeader('Content-type', img.mimeType);
      var filestream = fs.createReadStream(path.resolve(imageFolder, img.originalFilename));
      filestream.pipe(res);
      }
  } catch (err) {
    return next(err);
  }
};
