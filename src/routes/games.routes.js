const express = require("express");
const router = express.Router();
// importamos controlador
const gamesController = require("../controllers/games.controller.js");
// const gamesControllerRAWGio = require("../controllers/gamesRAWGio.controller.js");

// Importamos el middleware
// const authMiddleware = require("../middlewares/auth.middleware.js");
// rutas
// router.get("/", gamesControllerRAWGio.getAllGamesRAWGio); // Lista de los juegos de RAWGio

// Rutas privadas para listar juegos de la base de datos MySQL local
// router.get("/games", gamesController.getAllGames); // Lista los juegos de la base de datos MySQL
//router.get("/games/:idgame", authMiddleware, gamesController.getGamesById); // Lista los juegos de MySQL por Id

//---------.get("/games/name/:nom", authMiddleware, gamesController.getGamesByName); // Lista los juegos de MySQL por nombre del juego
//router.get("/games/plattform/:plattform", authMiddleware, gamesController.getGamesByPlattform); // Lista los juegos de MySQL por plataforma del juego
//router.get("/game/:id", userController.getUserById);

// Protegemos la Creacion de Usuarios con el middleware (Autenticacion JWT)
//----------router.post("/games", gamesController.createGame);
router.post("/games", gamesController.createGame);

// Protegemos la Actualizcion de Usuarios con middleware (Autenticacion JWT)
//router.put("/game/:idgame", authMiddleware, gamesController.updateGame);

// Protegemos la Eliminacion de Usuarios con middleware (Autenticacion JWT)
router.delete("/game/:idgame", gamesController.deleteGame);

// router.delete("/game/:idgame", gamesController.deleteGame);

router.post("/likes", gamesController.createLike);

router.delete("/likes", gamesController.deleteLike);

router.post("/ratings", gamesController.createRating);

router.delete("/ratings", gamesController.deleteRating);

module.exports = router;
