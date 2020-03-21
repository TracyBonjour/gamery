const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Collection = require("../models/Collection");

router.get("/", (req, res, next) => {
  if (err) {
    res.status(500).json({ message: "Error displaying collections." });
    return;
  }
  // Check user is logged in
  if (!req.user) {
    res
      .status(401)
      .json({ message: "You need to be logged in to see this page" });
    return;
  }
  res.status(200).json(req.user.collections);
});

router.post("/", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({message: "Login to create and manage collections"});
    return;
  }
  const newCollection = new Collection({ colTitle: req.body.colTitle });
  newCollection
    .save()
    .then(() => {
      User.findByIdAndUpdate(
        req.user.id,
        { $push: { collections: newCollection } },
        { new: true }
      )
        .then(() => {
          res.status(200).json(req.user.collections);
        })
        .catch(error => {
          next(error);
        });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
