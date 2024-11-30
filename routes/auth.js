const express = require('express');
const { signup, login } = require('../controllers/authController'); // Assure-toi que les contrôleurs existent et sont bien importés
const router = express.Router();

router.post('/signup', signup); // Appelle la fonction `signup`
router.post('/login', login);   // Appelle la fonction `login`

module.exports = router;
