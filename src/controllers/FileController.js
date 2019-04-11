const File = require('../models/File');

class FileController {
  async store(req, res) {
    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key
    });

    box.files.push(file);

    await box.save();

    req.io.sockets.in(box._id).emit('file', file);

   return res.json(file);
  }
}
//Criar um arquivo
module.exports = new FileController();