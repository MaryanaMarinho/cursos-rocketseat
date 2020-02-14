// importando o express
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

// o express é uma funcao que qd é chamada cria um servidor
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server); // serve para receber requisiçoes tanto http quanto websocket

const connectedUsers = {};

// transicao de mensagem do backend e o frontend em tempo real
io.on('connect', socket => {

    const { user } = socket.handshake.query;

    connectedUsers[user] = socket.id;



    /* Teste
    console.log('Nova conexao', socket.id);
    
    // ouvindo uma mensagem
    socket.on('hello', message => {
        console.log(message);
        
    })

    setTimeout(() => {
        socket.emit('world', {
            message: 'OmniStack'
        });
    }, 5000) */
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-jxhrd.mongodb.net/omnistack8?retryWrites=true&w=majority',{
    useNewUrlParser: true
});

// passando as informacoes do websocket para o controler
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

// para poder acessar a aplicacao do front
app.use(cors());

// falando pro express entender json
app.use(express.json());

// usando as rotas que estao no arquivo routes.js que foi importado ali em cima
app.use(routes);

// passando qual porta o servidor vai ficar ouvindo
server.listen(3333);