const express = require('express');
const routes = express.Router();

const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');

routes.get('/', (req, res) => {
    return res.json({ status: "UP", ok: true });
});

routes.post('/devs', DevController.store);
routes.get('/devs/:id/list', DevController.list);
routes.post('/devs/likes', LikeController.store);

module.exports = routes;