const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

routes.post('/boxes', BoxController.store);
routes.post(
  '/boxes/:id/files',
  multer(multerConfig).single('file'), FileController.store);
//colocamos .single('nome do campo no front-end) ele irá carregar um arquivo por vez, se quisermos vários colocamos o .array 

module.exports = routes;