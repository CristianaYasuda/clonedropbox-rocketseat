const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString('hex')}=${file.originalname}`;

        cb(null, file.key);
      })
    }
  })/*Queremos armazenar os arquivos no disco (não no cloudinary ou qualquer outra cloud) */
}; /*esse path ele padroniza os caminhos dentro do node, para não termos que mudar toda hora*/
   /*cb= callback*/