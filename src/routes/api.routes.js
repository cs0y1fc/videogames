const express = require("express");
const router = express.Router();

const apiController = require("../controllers/api.controller.js");

router.get("/randomAPI/creditcards/:size", apiController.getCreditCards);

module.exports = router;