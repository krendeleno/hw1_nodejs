const path = require('path');

const { imageFolder } = require('../config');
const { writeFile, removeFile } = require('../utils/fs');
const { generateId } = require('../utils/generateId');

module.exports = class Image {
  constructor(id, createdAt, size, mimeType) {
    this.id = id;
    this.createdAt = createdAt || Date.now();
    this.size = size;
    this.originalFilename = `${this.id}.jpg`
    this.mimeType = mimeType;
  }

  // async saveOriginal(content) {
  //   await writeFile(path.resolve(svgFolder, this.originalFilename), content);
  // }

  async removeOriginal() {
    await removeFile(path.resolve(imageFolder, this.originalFilename));
  }

  toPublicJSON() {
    return {
      id: this.id,
      size: this.size,
      mimetype: this.mimeType,
      createdAt: this.createdAt,
    };
  }

  toId() {
    return {
      id: this.id
    }
  }

  toJSON() {
    return {
      id: this.id,
      size: this.size,
      mimeType: this.mimeType,
      createdAt: this.createdAt,
    };
  }
};
