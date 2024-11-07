const db = require("../config/dbMySQL.js");
const Joi = require("joi");
// creamos schema de validacion de user
const gameSchema = Joi.object({
    gamename: Joi.string().required(),
    slug:Joi.string().required(),
    RAWG:Joi.string().optional().allow(''),
    imageUrl:Joi.string().optional().allow(''),
    release_date:Joi.string().optional().allow(''),
    metacritic:Joi.string().optional().allow(''),
    platforms:Joi.string().optional().allow(''),
    category:Joi.string().optional().allow('')
});

/*
exports.getAllGamesRAWGio = async (req, res) => {
    let connection;
    try {
        const size = req.params.size
        
        const apiUrlAscReleased = "https://api.rawg.io/api/games?ordering=released";
        const apiUrlDescReleased = "https://api.rawg.io/api/games?ordering=-released";
        
        const apiUrlAscAdded = "https://api.rawg.io/api/games?ordering=added";
        const apiUrlDescAdded = "https://api.rawg.io/api/games?ordering=-added";
        
        const apiUrlAscRating = "https://api.rawg.io/api/games?ordering=rating";
        const apiUrlDescRating = "https://api.rawg.io/api/games?ordering=-rating";

        const apiUrlAscName = "https://api.rawg.io/api/games?ordering=name";
        const apiUrlDescName = "https://api.rawg.io/api/games?ordering=-name";

        const apiUrlAscMetacritic = "https://api.rawg.io/api/games?ordering=metacritic";
        const apiUrlDescMetacritic = "https://api.rawg.io/api/games?ordering=-metacritic";



        const response = await fetch("https://api.rawg.io/api/games?key=24c111c2b1cb4df780ef88c578af1045");
        const response1 = await fetch("https://random-data-api.com/api/v2/credit_cards?size=" + size);
        
        
        const responseJSON = await response.json();
        // connection = await db.getConnection();
        // // Si nos llega solamente una tarjeta de crédito, llega como Objecto, sino Array
        // if (Array.isArray(responseJSON)) {
        //     // opcion map
        //     const values = responseJSON.map(credit_card => [
        //         credit_card.id,
        //         credit_card.uid,
        //         credit_card.credit_card_number,
        //         credit_card.credit_card_expiry_date,
        //         credit_card.credit_card_type,
        //     ]);
            
        //     await connection.query("insert into credit_cards values ?", [values]);
        // } else {
        //     await connection.query("insert into credit_cards values (?,?,?,?,?)", [
        //         responseJSON.id,
        //         responseJSON.uid,
        //         responseJSON.credit_card_number,
        //         responseJSON.credit_card_expiry_date,
        //         responseJSON.credit_card_type,
        //     ]);
        // }
        // opcion bucle:
        // connection = await db.getConnection();
        // responseJSON.forEach(async credit_card => {
        //     await connection.query("insert into credit_cards values (?,?,?,?,?)", [
        //         credit_card.id, 
        //         credit_card.uid,
        //         credit_card.credit_card_number,
        //         credit_card.credit_card_expiry_date,
        //         credit_card.credit_card_type
        //     ])
        // });

        return res.status(200).json({
            message: "Consumo a la RAWGio API correcta e insercion de los datos en MySQL",
            games: responseJSON.array.forEach(element => {
                element.games.results.name
            })// (const key in object) {
              //  console.log(key.games.results.name);
            })        
                    

        }
    } catch (error) {
        return res.status(500).json({
            message: "No se pudo consumir ramdomAPI",
            error: "Error 500: " + error
        });
    }

*/

/*
exports.getAllGames = async (req, res) => {
    let connection; // declarada fuera para que se pueda acceder desde cada bloque
    try {
        connection = await db.getConnection();
        const [result] = await connection.query("select * from games");
        if (result.length === 0) {
            return res.status(200).json({
                message: "No se encontraron games"
            });
        }
        return res.status(200).json({
            message: "Lista de games encontrados",
            result
        });
    } catch (error) {
        return res.status(500).json({
            message: "No se pudo obtener los games",
            error: "Error 500: " + error
        });
    } finally {
        if (connection) connection.release();
    }
}



exports.getGamesById = async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const [result] = await connection.query("select * from games where idgame = ?", [req.params.idgame]);
        if (result.length === 0) {
            return res.status(200).json({
                message: "No se encontró games con id: " + req.params.idgame
            }); 
        }
        return res.status(200).json({
            message: "Game encontrado!",
            result
        });
    } catch (error) {
        return res.status(500).json({
            message: "No se pudo obtener el game",
            error: "Error 500: " + error
        });
    } finally {
        if (connection) connection.release();
    }
}

exports.getGamesByName = async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const [result] = await connection.query("select * from games where nom = ?", [req.params.id]);
        if (result.length === 0) {
            return res.status(200).json({
                message: "No se encontró games con nombre: " + req.params.nom
            }); 
        }
        return res.status(200).json({
            message: "Usuario encontrado!",
            result
        });
    } catch (error) {
        return res.status(500).json({
            message: "No se pudo obtener el game",
            error: "Error 500: " + error
        });
    } finally {
        if (connection) connection.release();
    }
}

exports.getGamesByPlattform = async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const [result] = await connection.query("select * from games where plattform = ?", [req.params.plattform]);
        if (result.length === 0) {
            return res.status(200).json({
                message: "No se encontró juegos con plattform: " + req.params.plattform
            }); 
        }
        return res.status(200).json({
            message: "Game encontrado",
            result
        });
    } catch (error) {
        return res.status(500).json({
            message: "No se pudo obtener el game",
            error: "Error 500: " + error
        });
    } finally {
        if (connection) connection.release();
    }
}

*/

exports.createGame = async (req, res) => {
    let connection;
    try {
        // validar 
        const { error } = gameSchema.validate(req.body);
        if (error) {
            return res.status(404).json({
                message: error.details[0].message,
                error: "Errores de validación"
            });
        }
        // destructuring object
        // Recogemos el role del User
        const { gamename, slug, category, platforms, metacritic, release_date, imageUrl, RAWG } = req.body;
        connection = await db.getConnection();
        // Validar que el email no este registrado en MySQL
        console.log(RAWG, gamename, slug, imageUrl, release_date, metacritic, platforms, category );
        
        const [idgameRAWGExists] = await connection.query("select RAWG from games where RAWG = ?", [RAWG]);
        if (idgameRAWGExists.length > 0) {
            return res.status(400).json({
                message: `Game con idgameRAWG: ${RAWG} ya existe!`,
                error: "Error de validación"
            });
        }
        //const id = uuidv4();
        //const hashPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
        // evitar inyección sql
        // Si el role del Usuario se ha introducido, se inserta en la base de datos
        /*if (role) {
            const sql = "insert into users values (?, ?, ?, ?, ?, default, default)";
            await connection.query(sql, [id, username, email, hashPassword, role]);
            return res.status(201).json({
                message: "Usuario registrado correctamente",
                user: { id, username, email, hashPassword, role}
            });
        
        }*/
        // Si no se introduce el role del Usuario creado, se pone default en el SQL y la base de datos ya se encarga de poner el valor default=user
        const sql = "INSERT INTO games (gamename, slug, category, platforms, metacritic, release_date, imageUrl, RAWG) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        await connection.query(sql, [gamename, slug, category, platforms, metacritic, release_date, imageUrl, RAWG]);

        return res.status(201).json({
            message: "Game registrado correctamente!",
            game: {gamename, slug, category, platforms, metacritic, release_date, imageUrl, RAWG }
        });
    } catch (error) {
        return res.status(500).json({
            message: "No se pudo registrar game",
            error: "Error 500: " + error
        });
    } finally {
        if (connection) connection.release();
    }
}

/*
exports.updateGame = async (req, res) => {
    let connection;
    try {
        const id = req.params.id;
        connection = await db.getConnection();
        // validar si la id por url existe
        const [result] = await connection.query("select * from users where id = ?", [id]);
        if (result.length === 0) {
            return res.status(200).json({
                message: "No se encontró usuario con id: " + id
            });
        }
        // validar el formato (en este caso no dejamos que pueda actualizar el email)
        const { error } = userUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                error: "Error de validación"
            });
        }

        const { username, password } = req.body;

        const updateFields = [];
        const values = [];
        // construimos la consulta dinámicamente
        if (username) {
            updateFields.push("username = ?");
            values.push(username);
        }
        const hashPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
        if (password) {
            updateFields.push("password = ?");
            values.push(hashPassword);
        }
        values.push(id);
        // validar que no vengan otras props por el body
        if (updateFields.length === 0) {
            return res.status(400).json({
                message: "No se han proporcionado los datos correctos ('username' y 'password')",
                error: "Error de validación"
            });
        }
        const sql = `update users set ${updateFields.join(', ')} where id = ?`;
        await connection.query(sql, values);
        return res.status(201).json({
            message: "Usuario actualizado correctamente",
            user: { id, username, hashPassword }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error actualizando usuario",
            error: "Error 500: " + error
        });
    } finally {
        if (connection) connection.release();
    }
}
*/

exports.deleteGame = async (req, res) => {
    let connection;
    try {
        const idgame = req.params.idgame;
        connection = await db.getConnection();
        const [result] = await connection.query("select * from games where idgame = ?", [idgame]);

        if (result.length === 0) {
            return res.status(200).json({
                message: "No se encontró game con idgame: " + idgame
            });
        }
        await connection.query("delete from games where idgame = ?", [idgame]);
        return res.status(200).json({
            message: "Game borrado",
            result
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error borrando game",
            error: "Error 500: " + error
        });
    } finally {
        if (connection) connection.release();
    }
}

exports.createLike = async (req, res) => {
    let connection;
    try {
        // Validar entrada
        const { iduser, idgame } = req.body;
        if (!iduser || !idgame) {
            return res.status(400).json({
                message: "iduser y idgame son obligatorios",
                error: "Errores de validación"
            });
        }

        connection = await db.getConnection();

        // Verificar si el like ya existe
        const [likeExists] = await connection.query("SELECT * FROM likes WHERE iduser = ? AND idgame = ?", [iduser, idgame]);
        if (likeExists.length > 0) {
            return res.status(400).json({
                message: `El usuario con id: ${iduser} ya ha dado like al juego con id: ${idgame}`,
                error: "Error de validación"
            });
        }

        // Insertar el nuevo like en la base de datos
        const sql = "INSERT INTO likes (iduser, idgame) VALUES (?, ?)";
        await connection.query(sql, [iduser, idgame]);

        return res.status(201).json({
            message: "Like registrado correctamente!",
            like: { iduser, idgame }
        });
    } catch (error) {
        return res.status(500).json({
            message: "No se pudo registrar el like",
            error: "Error 500: " + error
        });
    } finally {
        if (connection) connection.release();
    }
}


exports.deleteLike = async (req, res) => {
    let connection;
    try {
        const { iduser, idgame } = req.body;
        if (!iduser || !idgame) {
            return res.status(400).json({
                message: "iduser y idgame son obligatorios",
                error: "Errores de validación"
            });
        }

        connection = await db.getConnection();

        // Verificar si el like existe antes de eliminarlo
        const [likeExists] = await connection.query("SELECT * FROM likes WHERE iduser = ? AND idgame = ?", [iduser, idgame]);
        if (likeExists.length === 0) {
            return res.status(404).json({
                message: `No existe un like del usuario con id: ${iduser} al juego con id: ${idgame}`,
                error: "No encontrado"
            });
        }

        // Eliminar el like
        const sql = "DELETE FROM likes WHERE iduser = ? AND idgame = ?";
        await connection.query(sql, [iduser, idgame]);

        return res.status(200).json({
            message: "Like eliminado correctamente!",
            like: { iduser, idgame }
        });
    } catch (error) {
        return res.status(500).json({
            message: "No se pudo eliminar el like",
            error: "Error 500: " + error
        });
    } finally {
        if (connection) connection.release();
    }
}

exports.createRating = async (req, res) => {
    let connection;
    try {
        // Validación de entrada
        const { iduser, idgame, rating } = req.body;
        
        if (typeof iduser !== 'number' || typeof idgame !== 'number' || typeof rating !== 'number') {
            return res.status(400).json({
                message: "iduser, idgame y rating deben ser números enteros",
                error: "Error de validación"
            });
        }
        
        if (![0, 1, 2, 3, 4, 5].includes(rating)) {
            return res.status(400).json({
                message: "El rating debe ser un número entero entre 0 y 5",
                error: "Error de validación"
            });
        }

        connection = await db.getConnection();

        // Verificar si el rating ya existe para este usuario y juego
        const [existingRating] = await connection.query("SELECT * FROM rating WHERE iduser = ? AND idgame = ?", [iduser, idgame]);
        if (existingRating.length > 0) {
            return res.status(400).json({
                message: `El usuario con id: ${iduser} ya ha calificado el juego con id: ${idgame}`,
                error: "Error de validación"
            });
        }

        // Insertar el nuevo rating en la base de datos
        const sql = "INSERT INTO rating (iduser, idgame, rating) VALUES (?, ?, ?)";
        await connection.query(sql, [iduser, idgame, rating]);

        return res.status(201).json({
            message: "Rating registrado correctamente!",
            rating: { iduser, idgame, rating }
        });
    } catch (error) {
        return res.status(500).json({
            message: "No se pudo registrar el rating",
            error: "Error 500: " + error
        });
    } finally {
        if (connection) connection.release();
    }
}

exports.deleteRating = async (req, res) => {
    let connection;
    try {
        // Validación de entrada
        const { iduser, idgame } = req.body;

        if (typeof iduser !== 'number' || typeof idgame !== 'number') {
            return res.status(400).json({
                message: "iduser y idgame deben ser números enteros",
                error: "Error de validación"
            });
        }

        connection = await db.getConnection();

        // Verificar si el rating existe antes de eliminarlo
        const [existingRating] = await connection.query("SELECT * FROM rating WHERE iduser = ? AND idgame = ?", [iduser, idgame]);
        if (existingRating.length === 0) {
            return res.status(404).json({
                message: `No existe un rating del usuario con id: ${iduser} para el juego con id: ${idgame}`,
                error: "No encontrado"
            });
        }

        // Eliminar el rating
        const sql = "DELETE FROM rating WHERE iduser = ? AND idgame = ?";
        await connection.query(sql, [iduser, idgame]);

        return res.status(200).json({
            message: "Rating eliminado correctamente!",
            rating: { iduser, idgame }
        });
    } catch (error) {
        return res.status(500).json({
            message: "No se pudo eliminar el rating",
            error: "Error 500: " + error
        });
    } finally {
        if (connection) connection.release();
    }
}
    
