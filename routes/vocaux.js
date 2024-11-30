const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const { postVocal, getVocaux } = require('../controllers/vocalController');

const router = express.Router();

// Route protégée pour ajouter un vocal
router.post('/', verifyToken, postVocal);

// Route publique pour récupérer les vocaux
router.get('/', getVocaux);

module.exports = router;
