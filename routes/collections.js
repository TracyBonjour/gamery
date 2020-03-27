const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Collection = require("../models/Collection");
const ensureLogin = require("connect-ensure-login");

//toutes les collections
router.get('/', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({message: "Login to create and manage collections"});
    return;
  }
  Collection.find({creatorId: req.user.id})
  .then(col => {
    console.log(col);
    res.status(200).json(col);
    return;
  })
  .catch(next)
})

//une collection
router.get('/:id', (req, res, next) => {
  Collection.findById(req.params.id)
  .then(col => {
    console.log(col);
    res.status(200).json(col);
    return;
  })
  .catch(next)
})

//ajouter une collection
//test dans postman : OK et OK dans BDD
router.post("/", (req, res, next) => {
  // console.log("coucou:"+req.body.colTitle);
  if (!req.user) {
    res.status(401).json({message: "Login to create and manage collections"});
    return;
  }
  const newCollection = new Collection({colTitle:req.body.colTitle, creatorId:req.user});
  newCollection
    .save()
    .then((collection) => {
      User.findByIdAndUpdate(
        req.user.id,
        { $push: { collections: collection } },
        { new: true }
      )
      .populate('user')
        .then(() => {
          res.status(200).json(newCollection.colTitle);
        })
        .catch(error => {
          next(error);
        });
    })
    .catch(error => {
      next(error);
    });
});

//supprimer une collection
//test dans postman : 200 OK mais réponse null / ne supprime pas dans bdd
router.delete("/", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({message: "You need to be logged in to delete your collection"});
    return;
  }

  Collection.findByIdAndRemove(req.params.id)
    .then(collection => {
      res.status(200).json(collection);
      return;
    })
    .catch(next);
});

//option 1 : updated / edit collection
//test dans postman : 200 OK mais pas de modification dans la BDD
// router.put("/:id", (req, res, next) => {
//   if (!req.user) {
//     res.status(401).json({message: "You need to be logged in to edit your collection"});
//     return;
//   }

//   Collection.findOne({_id: req.params.id})
//   .then(collection => {
//     res.status(200).json(req.collection);
//     return;
//   })
//   .catch(next);

//   Collection.update({ _id: req.params.id }, { $set : {
//     colTitle: req.body.colTitle
//   }})
//     .then((collections) => res.status(200).json(req.collection))
//     .catch(next);
// });

// test update Jenny
router.put("/:id", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({message: "You need to be logged in to edit your collection"});
    return;
  }
Collection.findByIdAndUpdate(
  { _id: req.params.id },
  { colTitle: req.body.colTitle, games:req.body.games },
  function(err, result) {
    if (err) {
      res.json(err);
    } else {
      res.status(201).json(result);
    }
  }
)});

//ajout jeu

// router.post("/api/games", (req, res, next) => {
  // console.log("coucou:"+req.body.colTitle);
//   if (!req.user) {
//     res.status(401).json({message: "Login to create and manage collections and games"});
//     return;
//   }
//   const newGame = new Game({
//     creatorID: req.user.id,
//     name: req.body.name,
//     description: req.body.description,
//     image: req.body.images.medium,
//   });
//   newGame
//     .save()
//     .then((game) => {
//       Collection.findByIdAndUpdate(
//         req.user.id,
//         { $push: { collections: collection } },
//         { new: true }
//       )
//       .populate('user')
//         .then(() => {
//           res.status(200).json(newCollection.colTitle);
//         })
//         .catch(error => {
//           next(error);
//         });
//     })
//     .catch(error => {
//       next(error);
//     });
// });


module.exports = router;

// JEN UPDATE : pour pouvoir mettre à jour la collection, il faut pourvoir le créer en base pour le référencier.
//pour pouvoir créer un jeu en base, il faut pouvoir définir à quelle collection il appartient (besoin de l'id du jeu et de l'id de la collection)