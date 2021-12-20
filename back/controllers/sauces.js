const Sauces = require("../models/sauces");
const fs = require("fs");

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
exports.modifySauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id }).then((sauce) => {
    const sauceObject = req.file
      ? {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };
    if (sauceObject.userId === sauce.userId) {
      Sauces.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id }
      )
        .then(() => {
          res.status(200).json({
            message: "Sauce modifiée avec succès !",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    }
  });
};

// Delete a sauce from the app
exports.deleteSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId === req.token.userId) {
        const filename = sauce.imageUrl.split("/images/")[1]; // get the filename
        fs.unlink(`images/${filename}`, () => {
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
        });
      } else {
        res.status(401).json({
          error: "Vous n'êtes pas autorisé à supprimer cette sauce",
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.likeDislikeSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauce) => {
      const userId = req.body.userId;
      const like = req.body.like;

      sauce.usersLiked = sauce.usersLiked.filter((user) => user !== userId);
      sauce.usersDisliked = sauce.usersDisliked.filter(
        (user) => user !== userId
      );

      if (like === 1) {
        sauce.usersLiked.push(userId);
      }
      if (like === -1) {
        sauce.usersDisliked.push(userId);
      }

      sauce.likes = sauce.usersLiked.length;
      sauce.dislikes = sauce.usersDisliked.length;

      sauce
        .save()
        .then(() => res.status(200).json({ message: "Avis modifié" }))
        .catch((error) => res.status(400).json({ error }));
    })

    .catch((error) => res.status(500).json({ error }));
};
