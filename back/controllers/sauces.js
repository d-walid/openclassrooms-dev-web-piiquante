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
exports.updateSauce = (req, res, next) => {
  const sauceObject = req.file
    ? // if it finds a file, it will parse and update the imageUrl
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : // else it will only update the concerned fields
      { ...req.body };
  Sauces.updateOne(
    { _id: req.params.id },
    {
      ...sauceObject,
      _id: req.params.id,
    }
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
  Sauces.findOne({ _id: req.params.id })
    .then((sauce) => {
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
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.likeSauce = (req, res, next) => {
  const like = req.body.like;

  if (like === 1) {
    // if the user liked the sauce, we add the userId to the likes array
    Sauces.updateOne(
      { _id: req.params.id },
      {
        $inc: { likes: 1 }, // increment the likes by 1
        $push: { usersLiked: req.body.userId }, // add the userId to the usersLiked array
        _id: req.params.id, // keep the _id
      }
    )
      .then(() => {
        res.status(201).json({
          message: "Sauce likée avec succès !",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  } else if (like === -1) {
    Sauces.updateOne(
      { _id: req.params.id },
      {
        $inc: { dislikes: 1 }, // increment the dislikes by 1
        $push: { usersDisliked: req.body.userId }, // add the userId to the usersDisliked array
        _id: req.params.id, // keep the _id
      }
    )
      .then(() => {
        res.status(201).json({
          message: "Sauce dislikée avec succès !",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  } else {
    // cancel the like or dislike of the sauce and remove the userId from the concerned array
    Sauces.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.usersLiked.indexOf(req.body.userId) !== -1) {
          Sauces.updateOne(
            { _id: req.params.id },
            {
              $inc: { likes: -1 }, // decrement the likes by 1
              $pull: { usersLiked: req.body.userId }, // remove the userId from the usersLiked array
              _id: req.params.id, // keep the _id
            }
          )
            .then(() => {
              res.status(201).json({
                message: "Sauce likée annulée avec succès !",
              });
            })
            .catch((error) => {
              res.status(400).json({
                error: error,
              });
            });
        } else if (sauce.usersDisliked.indexOf(req.body.userId) !== -1) {
          Sauces.updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: -1 }, // decrement the dislikes by 1
              $pull: { usersDisliked: req.body.userId }, // remove the userId from the usersDisliked array
              _id: req.params.id, // keep the _id
            }
          )
            .then(() => {
              res.status(201).json({
                message: "Sauce dislikée annulée avec succès !",
              });
            })
            .catch((error) => {
              res.status(400).json({
                error: error,
              });
            });
        }
      })
      .catch((error) => res.status(500).json({ error }));
  }
};
