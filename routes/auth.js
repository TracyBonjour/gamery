const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

const uploader = require('../configs/cloudinary-setup.js');


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//User authentifié
router.post("/sessions", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({message: 'Something went wrong authenticating user'});
      return;
    }
  
    if (!theUser) {
      res.status(401).json(failureDetails); // `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({message: 'Session save went bad.'});
        return;
      }

      // We are now logged in (thats why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

//User créé / enregistré
router.post("/users", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  if (!username || !password) {
    res.status(400).json({message: "Indicate username and password"});
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPass
    });

    newUser.save()
    .then(() => {
      req.login(newUser, (err) => {
        if (err) {
          res.status(500).json({message: 'Login after signup went bad.'});
          return;
        }
    
        res.status(201).json(newUser);
      });
    })
    .catch(err => {
      res.status(500).json({message: "Something went wrong"});
    })
  });
});

//User déconnecté
router.delete("/session", (req, res) => {
  req.logout();
  res.status(204).send();
});

//User connecté
router.get("/session", (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
    return;
  }

  res.status(403).json({message: 'Unauthorized'});
});

//auto loggedin
// router.get('/session', (req, res, next) => {
//   // req.isAuthenticated() is defined by passport
//   if (req.isAuthenticated()) {
//       res.status(200).json(req.user);
//       return;
//   }
//   res.status(403).json({ message: 'Unauthorized' });
// });

//updated / edit username, email et password
router.put("/user", (req, res, next) => {
  // Check user is logged in
  if (!req.user) {
    res.status(401).json({message: "You need to be logged in to edit your profile"});
    return;
  }

  // Updating `req.user` with each `req.body` field (excluding some internal fields `cannotUpdateFields`)
  const cannotUpdateFields = ['_id', 'password'];
  Object.keys(req.body).filter(key => cannotUpdateFields.indexOf(key) === -1).forEach(key => {
    req.user[key] = req.body[key];
  });

  // Validating user with its new values (see: https://mongoosejs.com/docs/validation.html#async-custom-validators)
  req.user.validate(function (error) {
    if (error) {
      // see: https://mongoosejs.com/docs/validation.html#validation-errors
      res.status(400).json({message: error.errors});
      return;
    }

    // Validation ok, let save it
    req.user.save(function (err) {
      if (err) {
        res.status(500).json({message: 'Error while saving user into DB.'});
        return;
      }

      res.status(200).json(req.user);
    })
  });
});


router.post("/upload", uploader.single("photo"), (req, res, next) => {
  // Check user is logged in
  if (!req.user) {
    res.status(401).json({message: "You need to be logged in to upload your avatar"});
    return;
  }

  // Check a file has been provided
  if (!req.file) {
    res.status(400).json({message: "No file uploaded!"});
    return;
  }

  // Updating user's `image`
  req.user.image = req.file.secure_url;

  // Validating user before saving
  req.user.validate(function (error) {
    if (error) {
      res.status(400).json({message: error.errors});
      return;
    }

    // Validation ok, let save it
    req.user.save(function (err) {
      if (err) {
        res.status(500).json({message: 'Error while saving user into DB.'});
        return;
      }

      res.status(200).json(req.user);
    })
  });
})

//afficher les infos du user
router.get("/user", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({message: "You need to be logged in to show your profile"});
    return;
  }

  User.findById(req.user.id)
  // User.findOne({_id: req.params.id})
    .then(user => {
      res.status(200).json(user);
      return;
    })
    .catch(next)
  ;
});

//supprimer un user
router.delete("/user", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({message: "You need to be logged in to delete your profile"});
    return;
  }

  User.findByIdAndRemove(req.user.id)
    .then(user => {
      res.status(200).json(req.user);
      return;
    })
    .catch(next)
  ;
});

module.exports = router;
