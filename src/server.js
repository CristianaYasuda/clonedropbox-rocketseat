const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();

app.use(cors());
// com esse middleware vai dizer que todo mundo pode acessar a aplicação e consumir os recursos dela.

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  })
});
// acima no io.on estamos conectando um usuário a uma sala única, a uma sala especifica

mongoose.connect(
  'mongodb+srv://omnistack:omnistack@cluster0-ivmhf.mongodb.net/omnistack?retryWrites=true', 
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(3030);