const db = require('../../entities/Database');

module.exports = async (req, res) => {
  const imageId = req.params.id;

  const id = await db.remove(imageId);

  return res.json({ id });
};
