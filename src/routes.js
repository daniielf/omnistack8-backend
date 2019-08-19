const express = require('express');
const routes = express.Router();

const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

routes.get('/', (req, res) => {
    return res.json({ status: "UP", ok: true });
});

routes.post('/devs', DevController.store);
routes.get('/devs/:id/list', DevController.list);
routes.post('/devs/likes', LikeController.store);
routes.post('/devs/dislikes', DislikeController.store);

module.exports = routes;
