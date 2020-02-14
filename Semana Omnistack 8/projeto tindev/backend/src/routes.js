const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = express.Router(); 

// routes.get('/', (requisicao, resposta) => {
//     return resposta.json({ message: `Hello ${requisicao.query.name}` });
// });

// routes.post('/devs', (req, res) => {
//     return res.json(req.body);
// });

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes;