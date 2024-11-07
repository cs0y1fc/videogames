const express = require("express");
const api = new express();
const cors = require('cors');
require("dotenv").config();

const userRoutes = require("./routes/user.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const apiRoutes = require("./routes/api.routes.js");
const gamesRoutes = require("./routes/games.routes.js");
const gamesRAWGioRoutes = require("./routes/gamesRAWGio.routes.js");
// go to: http://localhost:3000/api-docs/ para ver la doc de nuestra API
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.routes.json");
api.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// config middlewares 
api.use(cors());
api.use(express.json());
// Aqui falta incluir las Rutas de gamesRoutes para MySQL
api.use("/api/v1", gamesRAWGioRoutes, userRoutes, authRoutes, apiRoutes, gamesRoutes);
api.use((req, res) => { // 404
    res.status(404).json({ 
        message: "Ruta no encontrada",
        error: "Error 404"
    });
});

const PORT = process.env.PORT || 3000;
api.listen(PORT, () => {
    console.log(`Servidor corriendo en "http://localhost:${PORT}`);
});

// hola
