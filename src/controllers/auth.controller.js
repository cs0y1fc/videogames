const db = require("../config/dbMySQL.js");
const { v4: uuidv4 } = require('uuid');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const Joi = require("joi");
// creamos schema de validacion
//Añadimos la validacion del role
const signUpSchema = Joi.object({
    username: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    //role: Joi.string().optional().allow('')
});
const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

exports.signUp = async (req, res) => { 
    let connection;
    try {
        // validar 
        const { error } = signUpSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                error: "Error de validación"
            });
        } 
        // destructuring object
        const { username, email, password } = req.body;
        connection = await db.getConnection();
        // Validar que el email no este registrado en MySQL
        const [userEmailExists] = await connection.query("select email from users where email = ?", [email]);
        if (userEmailExists.length > 0) {
            return res.status(400).json({
                message: `Usuario con email: ${email} ya registrado en la APIRest!`,
                error: "Error de validación"
            });
        }
        
        const hashPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
        // evitar inyección sql
        // Si el usuario introduce el role, se introduce en la base de datos
        /*if (role) {
            const sql = "insert into users values (?, ?, ?, ?, ?, default)";
            await connection.query(sql, [id, username, email, hashPassword, role]);
            return res.status(201).json({
                message: "Usuario registrado correctamente!",
                user: { id, username, email, hashPassword, role }
            });
        }*/
        // Si el usuario NO introduce el role, se introduce el default de la base de datos
        console.log(username);
        console.log(email);
        
        const sql = "insert into users (iduser, username, email, password, createdAt)  values (default, ?, ?, ?, default);";
        await connection.query(sql, [username, email, hashPassword]);
        return res.status(201).json({
            message: "Usuario registrado correctamente!",
            user: { username, email, hashPassword }
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "No se pudo registrar usuario",
            error: "Error 500: " + error
        });
    } finally {
        if (connection) connection.release();
    }
}

exports.signIn = async (req, res) => {
    let connection;
    try {
        // validar 
        const { error } = signInSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                error: "Error de validación"
            });
        }
        // destructuring object
        const { email, password } = req.body;
        connection = await db.getConnection();
        // Validar que el email esté registrado en MySQL
        const [user] = await connection.query("select * from users where email = ?", [email]);
        if (user.length === 0) {
            return res.status(200).json({
                message: `Usuario con email: ${email} no registrado en la APIRest!`,
                error: "Error de Inicio de Sesión"
            });
        }
        // desencriptar password
        const originalPassword  = CryptoJS.AES.decrypt(user[0].password, process.env.CRYPTO_SECRET).toString(CryptoJS.enc.Utf8)
        if (password !== originalPassword) {
            return res.status(200).json({
                message: `Contraseña errónea!`,
                error: "Error de Inicio de Sesión"
            });
        }
        // Introducimos el dato del ROLE en el token (para filtrar despues en el CRUD segun el role)
        const token = jwt.sign({
            id: user[0].id,
            email: user[0].email,
            role: user[0].role
        }, process.env.JWT_SECRET, {expiresIn: "1h"});
        console.log(token);
        

        return res.status(200).json({
            message: `Datos de signin correctos!`,
            token,
        });

    } catch (error) {
        return res.status(500).json({
            message: "No se pudo registrar usuario",
            error: "Error 500: " + error
        });
    } finally {
        if (connection) connection.release();
    }
}

exports.profile = async (req, res) => {
    res.json({
        message: "Bienvenido a tu perfil de usuario: " + req.user.email,
        user: req.user
    })
}

exports.private = async (req, res) => {
    res.json({
        message: `Bienvenido ${req.user.email} a tu ruta privada`
    })
}