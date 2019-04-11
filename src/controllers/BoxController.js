const Box = require('../models/Box');

class BoxController {
  async store(req, res) {
    const box = await Box.create(req.body);
// esse await esta na frente porque ele é assincrono.
    return res.json(box);
  }/* store é tipo um middleware que usuário pode criar outras pastas para upload */
  async show(req, res) {
    const box = await Box.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } }
    })
    return res.json(box)
  }
}


module.exports = new BoxController();