const db = require('../../entities/Database');
const Image = require('../../entities/Image');
const { BadRequestApiError } = require('../../validators/errors/ApiError');


module.exports = async (req, res, next) => {
  try {
    // const { image } = req.body;
    //
    // if (!image) {
    //   throw new BadRequestApiError('SVG content should not be empty');
    // }

    const imageFile = new Image(req.file.id, null, req.file.size, req.file.mimetype);
    await db.insert(imageFile);

    return res.json(imageFile.toPublicJSON());
  } catch (err) {
    return next(err);
  }
};
