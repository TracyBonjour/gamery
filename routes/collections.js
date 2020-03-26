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
  // test dans postman : 500 err is not defined
  Collection.find({_id: {$in: req.user.collections}})
  .populate('User')
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
//test dans postman : 500 Cannot read property 'id' of undefined
router.delete("/", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({message: "You need to be logged in to delete your collection"});
    return;
  }

  Collection.findByIdAndRemove(req.collection.id)
    .then(collection => {
      res.status(200).json(req.collection);
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
    res.status(200).json(req.collection);
    return;
  })
  .catch(next);

  Collection.update({ _id: req.params.id }, { $set : {
    colTitle: req.body.colTitle,
  }})
    .then((collections) => res.status(200).json(req.collection))
    .catch(next);
});

//option 2 : updated / edit collection
//test dans postman : KO
// router.put("/", (req, res, next) => {
//   if (!req.user) {
//     res.status(401).json({message: "You need to be logged in to edit your collection"});
//     return;
//   }

//   // Updating `req.user` with each `req.body` field (excluding some internal fields `cannotUpdateFields`)
//   const cannotUpdateFields = ['_id'];
//   Object.keys(req.body).filter(key => cannotUpdateFields.indexOf(key) === -1).forEach(key => {
//     req.collection[key] = req.body[key];
//   });

//   req.collection.validate(function (error) {
//     if (error) {
//       res.status(400).json({message: error.errors});
//       return;
//     }

//     // Validation ok, let save it
//     req.user.save(function (err) {
//       if (err) {
//         res.status(500).json({message: 'Error while saving user into DB.'});
//         return;
//       }

//       res.status(200).json(req.user);
//     })
//   });
// });


module.exports = router;
