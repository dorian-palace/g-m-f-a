require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); // Pour la gestion MongoDB avec Mongoose
const cors = require('cors');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');

// Initialisation de l'application
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// Variables d'environnement
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://djnpalace:kiidoazepoi1507@cluster0.v2ryo.mongodb.net/?retryWrites=true&w=majority";

// Connexion à MongoDB avec Mongoose
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.error("Erreur lors de la connexion à MongoDB :", err));

// Routes simples pour tester
app.get('/', (req, res) => {
  res.send('API fonctionne correctement');
});

// Ajouter d'autres routes ici
// Exemple : const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes);

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
