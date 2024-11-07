const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({
            message: "Token no proporcionado",
            error: "Error de autenticación"
        });
    }

    try {
        // recogemos el token (separamos el texto Bearer)
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);  
        // Agregamos en el "req"los datos que vienen en el token
        req.user = decoded;
        console.log(req.user);
        // El middleware solo acepta a usuarios ADMIN
        if (req.user.role == "admin") {
            next();
        } else {
            return res.status(401).json({
                message: "Usuari no ADMIN",
                error: "El usuario NO tiene permisos de ADMIN para Crear, Actualizar o Borrar Usuarios."
            });
        }
        
    } catch (error) {
        return res.status(401).json({
            message: "Token no autorizado ó caducado",
            error: "Error de autenticación"
        });
    }
}

module.exports = authMiddleware;