const Sauces = require("../models/sauces");

// Add a new sauce to the app
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauces = new Sauces({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauces
    .save()
    .then(() => {
      res.status(201).json({
        message: "Sauce ajoutée avec succès !",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Get one sauce from the app
exports.getOneSauce = (req, res, next) => {
  Sauces.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Get all sauces from the app
exports.getAllSauces = (req, res, next) => {
  Sauces.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Update a sauce from the app
exports.updateSauce = (req, res, next) => {
  const sauce = new Sauces({
    _id: req.params.id,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
  });
  Sauces.updateOne(
    {
      _id: req.params.id,
    },
    sauce
  )
    .then(() => {
      res.status(201).json({
        message: "Sauce modifiée avec succès !",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Delete a sauce from the app
exports.deleteSauce = (req, res, next) => {
  Sauces.deleteOne({
    _id: req.params.id,
  })
    .then(() => {
      res.status(200).json({
        message: "Sauce supprimée avec succès !",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
