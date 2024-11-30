const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fonction d'inscription
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
  
    console.log('Requête reçue :', req.body); // Log pour confirmer les données reçues
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
  
      const savedUser = await newUser.save();
      console.log('Utilisateur enregistré dans la DB :', savedUser); // Log pour confirmer l'enregistrement
  
      res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (err) {
      console.error('Erreur lors de l\'inscription :', err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  };
  
  
  

// Fonction de connexion
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Utilisateur introuvable' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
