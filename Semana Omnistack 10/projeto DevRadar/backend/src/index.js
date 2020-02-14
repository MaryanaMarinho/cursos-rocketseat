const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('url-de-conexao', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());

// use() quer dizer que algo que vai ser valido para todas as rotas
// dizendo pro express entender json
app.use(express.json());
app.use(routes);

app.listen(3333);

