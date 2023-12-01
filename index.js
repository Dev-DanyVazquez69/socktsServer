const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: '*'}})

const PORT = 3002
//Configuração e inicialização do servidor na porta 3002.

io.on('connection', socket => {
  console.log('Usuário conectado!', socket.id);

  socket.on('disconnect', reason => {
    console.log('Usuário desconectado!', socket.id)
  })

//Quando um usuário se conecta (connection), é executado um callback que recebe o objeto socket representando a conexão com esse usuário.
//O evento disconnect é tratado para ser notificado quando um usuário se desconectar.

  socket.on('set_username', username => {
    socket.data.username = username
  })

//Permite que o cliente defina um nome de usuário associado ao seu socket.

  socket.on('message', text => {
    io.emit('receive_message', {
      text,
      authorId: socket.id,
      author: socket.data.username
    })
  })
})

//O evento message é ouvido, e quando ocorre, a mensagem é emitida para todos os clientes conectados usando io.emit.
//A mensagem enviada contém o texto da mensagem, o ID do autor (socket.id) e o nome de usuário do autor (se definido).

server.listen(PORT, () => console.log('Servidor Online'))