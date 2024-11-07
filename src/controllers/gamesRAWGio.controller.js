const db = require("../config/dbMySQL.js");


exports.getAllGamesRAWGio = async (req, res) => {
    let connection;
    try {
        const size = req.params.size
        const url = "https://api.rawg.io/api/games?key=24c111c2b1cb4df780ef88c578af1045";
        const response = await fetch(url);
        
/*        "https://api.rawg.io/api/games?ordering=-released"
        "https://api.rawg.io/api/games?ordering=released"
        "https://api.rawg.io/api/games?ordering=-rating"
        "https://api.rawg.io/api/games?ordering=name"

        Filtrar por Genero
        "https://api.rawg.io/api/games?genres=action&ordering=-rating"

        Filtrar por Plataforma
        "https://api.rawg.io/api/games?platforms=4&ordering=-rating"

*/

        // &ordering=added
        const response2 = await fetch("https://api.rawg.io/api/games?key=24c111c2b1cb4df780ef88c578af1045");
        
        const response3 = await fetch("https://api.rawg.io/api/games?key=24c111c2b1cb4df780ef88c578af1045&search=");
        const response1 = await fetch("https://random-data-api.com/api/v2/credit_cards?size=" + size);
        

        const responseJSON = await response.json();
        connection = await db.getConnection();
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
            games: responseJSON
            //.for (const key in object) {
              //  console.log(key.games.results.name);
                
                    

        });
    } catch (error) {
        return res.status(500).json({
            message: "No se pudo consumir ramdomAPI",
            error: "Error 500: " + error
        });
    }
}
