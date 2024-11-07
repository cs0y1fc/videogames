
// Selecciona el botón y el menú desplegable
const loginButton = document.getElementById('Signin');
const dropdownMenu1 = document.querySelector('.dropdown-menu1');

// Añade el evento para mostrar u ocultar el menú desplegable
loginButton.addEventListener('click', function () {
    if (dropdownMenu1.style.display === 'block') {
        dropdownMenu1.style.display = 'none';
    } else {
        dropdownMenu1.style.display = 'block';
    }
});


const signupButton = document.getElementById('Signup');
const dropdownMenu2 = document.querySelector('.dropdown-menu2');

// Añade el evento para mostrar u ocultar el menú desplegable
signupButton.addEventListener('click', function () {
    if (dropdownMenu2.style.display === 'block') {
        dropdownMenu2.style.display = 'none';
    } else {
        dropdownMenu2.style.display = 'block';
    }
});


        // Aquí hacemos la petición a la API
const apiUrl = 'http://localhost:3000/api/v1';
        const api1Url1 = 'https://api.rawg.io/api/games?key=24c111c2b1cb4df780ef88c578af1045';

          // Reemplaza con la URL correcta de tu API

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const games = data.games.results;  // Extraemos el array de juegos
        const gameList = document.getElementById('gameList');
        
        games.forEach(game => {
            // Extraemos el nombre, la imagen y las plataformas del juego
            const idgameRAWG = game.id;
            const gamename = game.name;
            const slug = game.slug;
            const imageUrl = game.background_image;
            const released = game.released;

            const metacritic = game.metacritic;
            const platforms = game.platforms.map(p => p.platform.name).join(', ');

            const category = game.genres.map(g => g.name).join(', ');
            
            //`<a href="http://${s.store.domain}">s.store.name</a>`.join('<br>'));
            

            const stores = game.stores 
            ? game.stores.map(s => `<a href="https://${s.store.domain}" target="_blank">${s.store.name}</a>`).join(' ')
            : 'No disponible';
            // Creamos el elemento HTML para cada juego
            const gameItem = document.createElement('div');
            gameItem.classList.add('game-item');
            
            gameItem.innerHTML = `
                <img src="${imageUrl}" alt="${gamename}">
                <h3>${gamename}</h3>
                <p>Released: ${released}</p>
                <p>idgameRAWG: ${idgameRAWG}</p>

                <p>metacritic: ${metacritic}</p>

                <p>Categories: ${category}</p>
                <p>Plataformas: ${platforms}</p>
                <p>Slug: ${slug}</p>
                <p>Tiendas: ${stores}</p>
                <button class="menu-btn-signup" type="button" id="logout">Like</button>


                                        
            `;
            
            // Añadimos el juego al contenedor
            gameList.appendChild(gameItem);
        });
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });

document.addEventListener('DOMContentLoaded', function() {
        comprobarToken();
    });
    