const path = require('path');

const { imageFolder } = require('../../config');
const { exists } = require('../../utils/fs');
const {
  BadRequestApiError,
  NotFoundApiError,
} = require('../../validators/errors/ApiError');

module.exports = async (req, res, next) => {
  try {
    const { filename } = req.params;

    if (!filename || filename.includes('.image') === false) {
      throw new BadRequestApiError(
        'Filename should be provided and end with .image'
      );
    }

    const pathToFile = path.resolve(imageFolder, filename);
    const isFileExists = await exists(pathToFile);

    if (isFileExists === false) {
      throw new NotFoundApiError('SVG file not found');
    }

    return res.download(pathToFile);
  } catch (err) {
    next(err);
  }
};
