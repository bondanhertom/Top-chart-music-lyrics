const express = require("express");
const router = express.Router();

const ControllerUser = require('../controllers/users')
const ControllerSong = require('../controllers/songs')
const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')


router.get('/', (req, res) => {
    res.status(200) //memberi status dari respon yang diminta
        .json({ massage: "TES UPDATES" }) //balikan data yang diberikan saat memberi respon
})



router.post('/pub/register', ControllerUser.register)
router.post('/pub/login', ControllerUser.login)
router.post('/google-sign-in',ControllerUser.loginWithGoogle)

router.get('/pub/songs', ControllerSong.getSongs)
router.get('/pub/favorites',authentication, ControllerSong.getFavorite)
router.get('/spotify/top-charts',ControllerSong.getTopChart)
router.get('/pub/songs/:id', ControllerSong.getSongsById)
router.post('/pub/favorites/:id', authentication, ControllerSong.createFavorite)
router.delete('/pub/favorites/:id', authentication, authorization, ControllerSong.deleteFavorite)





module.exports = router