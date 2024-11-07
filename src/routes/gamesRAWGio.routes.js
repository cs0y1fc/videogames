const express = require("express");
const router = express.Router();
// importamos controlador
const gamesRAWGioController = require("../controllers/gamesRAWGio.controller.js");
// Importamos el middleware
// const authMiddleware = require("../middlewares/auth.middleware.js");
// rutas
router.get("/", gamesRAWGioController.getAllGamesRAWGio);

module.exports = router;