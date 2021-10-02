const db = require('../../entities/Database');

module.exports = (req, res) => {
  const allImages = db.find().map((image) => image.toPublicJSON());

  return res.json(allImages);
};
