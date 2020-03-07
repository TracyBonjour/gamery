const express = require("express")
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.cloudKey,
    api_secret: process.env.cloudSecret
  });

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "avatars",
  allowedFormats: ["jpg", "png", "jpeg"],
});

const upload = multer({storage})
module.exports = upload