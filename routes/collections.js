const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Collection = require("../models/Collection");


router.get("/", (req, res, next) => {

  // Check user is logged in
  if (!req.user) {
    res
      .status(401)
      .json({ message: "You need to be logged in to see this page" });
    return;
  }
  res.status(200).json(req.user.collections);

  // afficher les collections de l'user
  // test dans postman : 200 OK
  Collection.find({_id: {$in: req.user.collections}})
    .then(collection => {
      res.status(200).json(collection);
      return;
    })
    .catch(next);

});

//ajouter une collection
//test dans postman : OK et OK dans BDD
router.post("/", (req, res, next) => {
  // console.log("coucou:"+req.body.colTitle);
  if (!req.user) {
    res.status(401).json({message: "Login to create and manage collections"});
    return;
  }
  const newCollection = new Collection({colTitle:req.body.colTitle});
  newCollection
    .save()
    .then((collection) => {
      User.findByIdAndUpdate(
        req.user.id,
        { $push: { collections: collection } },
        { new: true }
      )
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
router.put("/", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({message: "You need to be logged in to edit your collection"});
    return;
  }

  Collection.findOne({_id: req.params.id})
  .then(collection => {
    res.status(200).json(collection);
    return;
  })
  .catch(next);

  Collection.update({ _id: req.params.id }, { $set : {
    colTitle: req.body.colTitle,
  }})
    .then((collection) => res.status(200).json(collection))
    .catch(next);
});



module.exports = router;
