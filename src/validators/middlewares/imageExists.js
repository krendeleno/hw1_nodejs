const db = require('../../entities/Database');

module.exports = (req, res, next) => {
  const imageId = req.params.id;

  if (db.findOne(imageId) === null) {
    return res.sendStatus(400);
  }

  next();
};
