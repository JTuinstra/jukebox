const express = require('express');
const router = express.Router();
const Controller = require('../controllers/spotifyController').Controller;
const controller = new Controller();

router.get('/search', controller.searchAnything);
router.get('/getPlaylists', controller.getPlaylists);
router.post('/createPlaylist', controller.createPlaylist);
router.post('/addTrackToPlaylist', controller.addTrackToPlaylist);


module.exports = router;