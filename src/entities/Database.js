const { EventEmitter } = require('events');
const { existsSync } = require('fs');
const { dbDumpFile } = require('../config');
const { writeFile } = require('../utils/fs');
const { prettifyJsonToString } = require('../utils/prettifyJsonToString');
const Image = require('./Image');

class Database extends EventEmitter {
  constructor() {
    super();

    this.idToImage = {};
  }

  async initFromDump() {
    if (existsSync(dbDumpFile) === false) {
      return;
    }

    const dump = require(dbDumpFile);

    if (typeof dump.idToImage === 'object') {
      this.idToImage = {};

      for (let id in dump.idToImage) {
        const image = dump.idToImage[id];

        this.idToImage[id] = new Image(image.id, image.createdAt, image.size, image.mimeType);
      }
    }

  }

  async insert(image) {
    // await image.saveOriginal(originalContent);

    this.idToImage[image.id] = image;

    this.emit('changed');
  }


  async remove(imageId) {
    const imageRaw = this.idToImage[imageId];

    const image = new Image(imageRaw.id, imageRaw.createdAt, imageRaw.size, imageRaw.mimeType);

    await image.removeOriginal();

    delete this.idToImage[imageId];

    this.emit('changed');

    return imageId;
  }

  findOne(svgId) {
    const imageRaw = this.idToImage[svgId];

    if (!imageRaw) {
      return null;
    }

    const image = new Image(imageRaw.id, imageRaw.createdAt, imageRaw.size, imageRaw.mimeType);

    return image;
  }

  find() {
    let allImgs = Object.values(this.idToImage);

    allImgs.sort((svgA, svgB) => svgB.createdAt - svgA.createdAt);

    return allImgs;
  }
  toJSON() {
    return {
      idToImage: this.idToImage,
    };
  }
}

const db = new Database();

db.initFromDump();

db.on('changed', () => {
  writeFile(dbDumpFile, prettifyJsonToString(db.toJSON()));
});

module.exports = db;
