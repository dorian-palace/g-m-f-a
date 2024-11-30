const Vocal = require('../models/Vocal');

exports.postVocal = async (req, res) => {
  const { latitude, longitude, audioUrl } = req.body;
  try {
    const newVocal = new Vocal({
      user: req.user.id,
      location: { latitude, longitude },
      audioUrl,
    });
    await newVocal.save();
    res.status(201).json(newVocal);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de l’ajout du vocal' });
  }
};

exports.getVocaux = async (req, res) => {
  const { lat, lng, radius } = req.query;
  try {
    const vocaux = await Vocal.find({
      'location.latitude': { $gte: lat - radius, $lte: lat + radius },
      'location.longitude': { $gte: lng - radius, $lte: lng + radius },
    });
    res.json(vocaux);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des vocaux' });
  }
};
