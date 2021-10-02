const { Router } = require('express');
const { imageFolder } = require('./config');
const api = require('./controllers/api');
const multer  = require('multer')
const { generateId } = require('./utils/generateId');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageFolder)
  },
  filename: function (req, file, cb) {
    file.id = generateId();
    cb(null, file.id + ".jpg")
  }
})
const upload = multer({ storage: storage })


// routes for /api

const apiRouter = new Router();

apiRouter.get('/list', api.getImages);
apiRouter.get('/image/:id', api.getImage);
apiRouter.get('/merge', api.merge);
apiRouter.post('/upload', upload.single('image'), api.addImage);
apiRouter.delete('/image/:id', api.deleteImage);

exports.apiRouter = apiRouter;
