# VideoGames API RESTful


Aquest projecte és una aplicació web full-stack que inclou una API de backend construïda amb Node.js, Express i MySQL. L'API permet gestionar usuaris i videojocs mitjançant una base de dades MySQL. S'inclou la connexió a l'API pública [RAWG.io](https://rawg.io/) per obtenir informació sobre videojocs. També inclou un front-end web que suporta l'autenticació i registre d'usuaris i videojocs a una base de dades MySQL. Este es el proyecto final API REST Express.js ,MYsql del Curso IFCD0112.

## 1.- Característiques

- API CRUD d'usuaris i videojocs en MySQL
- Integració amb l'API de RAWG.io per obtenir dades externes de videojocs
- Autenticació d'usuaris amb JSON Web Tokens (JWT)
- Documentació de l'API amb Swagger
- Front-end amb HTML, JS i CSS
- LocalStorage per emmagatzemar el token JWT generat al Login

## Estructura del Projecte

```plaintext
.
├── html_client
│   ├── css
│   │   ├── style.css                # Full d'estils CSS
│   ├── index.html                   # Pàgina HTML principal
│   ├── index.js                     # Funcions JS
│   ├── style.css                    # Full d'estils CSS
├── src
│   ├── routes
│   │   ├── user.routes.js           # Rutes per al CRUD d'usuaris
│   │   ├── auth.routes.js           # Rutes d'autenticació
│   │   ├── api.routes.js            # Rutes generals de l'API
│   │   ├── games.routes.js          # Rutes per al CRUD de jocs (MySQL)
│   │   └── gamesRAWGio.routes.js    # Rutes per obtenir dades de RAWG.io
│   ├── controllers
│   │   ├── user.controller.js       # Lògica de negoci per a usuaris
│   │   ├── auth.controller.js       # Lògica d'autenticació
│   │   ├── api.controller.js        # Controlador general
│   │   └── gamesRAWGio.controller.js# Control i acces a l'API de videojocs publica RAWG.io
│   ├── middlewares
│   │   ├── auth.middleware.js       # Middleware d'autenticació JWT
│   ├── config
│   │   ├── dbMySQL.js               # Paràmetres de connexió a la nostra Base de Dades MySQL
│   ├── swagger
│   │   ├── swagger.routes.json      # Documentació estructurada de la API
│   ├── sql
│   │   └── db.sql                   # Base de Dades MySQL
│   ├── swagger
│   │   └── swagger.routes.json      # Documentació de Swagger
├── .env                             # Variables d'entorn
└── api.js                           # Fitxer principal del servidor express
└── Projecte.md                      # Aquest fitxer

```
Els paquets de Nodejs que hem utilitzat són: 

- mysql2:   gestiona la connexió a la base de dades MySQL
- uuid:     generació de números aleatoris
- crypto-js:    encriptació de dades
- jsonwebtoken:     generació de web token
- joi:  verificació del format de les dades d´entrada
- express:  framework Nodejs que permet la creació de servidors web backend amb JavaScript.
- cors:     permet l'aplicació de middleware's als servidors express de backend.



## 2.- Desplegament

El desplegament de l'aplicació backend es farà mitjançant la pujada dels fitxers de backend a [Render](https://render.com) i la base de dades MySQL es desplegarà a [Railway.app](https://railway.app).

Per desplegar una aplicació backend amb Node.js a Render.com i una base de dades MySQL a Railway.app amb els arxius del repositori de GitHub, segueix aquests passos:

1. **Desplegament del backend a Render.com**:
   - Crea un compte a [Render.com](https://render.com) i connecta’l amb el teu repositori de GitHub.
   - Crea un nou servei web i selecciona el repositori amb el projecte backend.
   - Configura les variables d’entorn necessàries (com `PORT`, `JWT_SECRET`, etc.) des de Render.com.
   - Render detectarà automàticament el fitxer `package.json` i instal·larà les dependències; defineix la comanda d'inici (`npm start`).
   - Publica el servei per generar l’URL de producció.

2. **Desplegament de MySQL a Railway.app**:
   - Crea un compte a [Railway.app](https://railway.app) i selecciona l’opció de desplegar una base de dades MySQL.
   - Railway generarà les credencials de connexió (host, usuari, contrasenya, base de dades).
   - Afegeix aquestes credencials com a variables d’entorn a Render.com perquè el backend es pugui connectar a la base de dades.
   
Amb això, l’aplicació backend i la base de dades estaran desplegades en línia i accessibles des de qualsevol lloc.

## 3.- Control de Versions

Per controlar les versions d’aquesta app utilitzem Git i GitHub. Primer cal inicialitzar un repositori local amb `git init` i afegir els canvis amb `git add` i `git commit`. Després pugem els canvis a GitHub amb Push per a què d'altres desenvolupadors puguin col·laborar i mantenir un historial clar de les versions.