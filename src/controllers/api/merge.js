const fs = require("fs");
const path = require("path");
const db = require('../../entities/Database');
const { imageFolder } = require('../../config');
const { BadRequestApiError } = require('../../validators/errors/ApiError');

const { replaceBackground } = require("backrem");

module.exports = async (req, res, next) => {
  const frontId = req.query.front;
  const backId = req.query.back;
  const color = String(req.query.color).split(", ").map((num)=>{
    return Number(num)
  }) || null;
  console.log(color)
  const threshold = req.query.threshold || null;

  const frontImg = fs.createReadStream(
    path.resolve(imageFolder, db.findOne(frontId).originalFilename)
  );

  const backImg = fs.createReadStream(
    path.resolve(imageFolder, db.findOne(backId).originalFilename)
  );
    replaceBackground(frontImg, backImg, color, threshold).then(
      (readableStream) => {
        // const writableStream = fs.createWriteStream(
        //   path.resolve(__dirname, "./result/result.jpg")
        // );
        res.setHeader('Content-type', db.findOne(frontId).mimeType);
        readableStream.pipe(res);
      }).catch((err) =>  {new BadRequestApiError(err); next(err);}) ;
};
