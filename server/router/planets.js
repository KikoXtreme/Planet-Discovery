const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { planetController, postController } = require('../controllers');

// middleware that is specific to this router

router.get('/', planetController.getPlanets);
router.get('/list', planetController.getPlanetsList);
router.post('/', auth(), planetController.createPlanet);

router.get('/:planetId', planetController.getPlanet);
router.post('/:planetId', auth(), postController.createPost);
router.put('/:planetId', auth(), planetController.subscribe);
router.put('/:planetId/unsubscribe', auth(), planetController.unsubscribe);
router.put('/:planetId/posts/:postId', auth(), postController.editPost);
router.delete('/:planetId/posts/:postId', auth(), postController.deletePost);

// router.get('/my-trips/:id/reservations', auth(), planetController.getReservations);

module.exports = router