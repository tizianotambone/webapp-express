const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.SERVER_PORT || 3000;

const imagePath = require('./middleware/imagePath');

// Middleware per parse JSON - OK che venga prima delle rotte
app.use(express.json());

// Espone la cartella 'public' per risorse statiche generiche
app.use(express.static('public'));

// Espone la cartella 'movies_cover' per le immagini dei film
app.use('/movies_cover', express.static('movies_cover'));

// Middleware personalizzato per aggiungere req.imagePath
app.use(imagePath);

// CORS (dopo dotenv, prima delle rotte)
console.log('FE_APP origin consentita:', process.env.FE_APP);
app.use(cors({
  origin: process.env.FE_APP
}));

// Router API film
const filmRouter = require('./router/router');
app.use('/api/movies', filmRouter);

// Rotta di default base
app.get('/', (req, res) => {
  res.send("welcome to my movie list");
});

// Avvio server
app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
