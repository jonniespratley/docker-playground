const express = require("express")

module.exports = express().get("/", (req, res) => {
  res.send(`Howdy from ${req.path}!`)
});