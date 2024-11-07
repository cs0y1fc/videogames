const express = require("express");
const router = express.Router();
// importamos controlador
const userController = require("../controllers/user.controller.js");
// Importamos el middleware
const authMiddleware = require("../middlewares/auth.middleware.js");
// rutas
router.get("/users", userController.getAllUsers);
router.get("/user/:id", userController.getUserById);
// Protegemos la Creacion de Usuarios con el middleware (Autenticacion JWT)
router.post("/user", authMiddleware, userController.createUser);
// Protegemos la Actualizcion de Usuarios con middleware (Autenticacion JWT)
router.put("/user/:id", authMiddleware, userController.updateUser);
// Protegemos la Eliminacion de Usuarios con middleware (Autenticacion JWT)
router.delete("/user/:id", authMiddleware, userController.deleteUser);

module.exports = router;

