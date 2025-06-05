const connection = require('../data/data');  // <- IMPORTANTE

const index = (req, res) => { 
  connection.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore durante la query: ' + err });
    }
    
    // Aggiungi il percorso dell'immagine a ogni film
    const movies = results.map(movie => ({
      ...movie,
      image: req.imagePath + movie.image
    }));
    
    res.json(movies);
  }); 
}

const show = (req, res) => {
  const {id} = req.params;
  const movieSql = 'SELECT * FROM movies WHERE id = ?';

  connection.query(movieSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore durante la query: ' + err });
    }
    
    if (results.length === 0 || results[0].id === null) {
      return res.status(404).json({ error: 'Film non trovato' });
    }
    
    const movie = results[0];
    movie.image = req.imagePath + movie.image; // Aggiungi il percorso dell'immagine
    res.json(movie);
  });
};

const getReviews = (req, res) => {
  const movieId = req.params.id;
  const sql = 'SELECT * FROM reviews WHERE movie_id = ?';

  connection.query(sql, [movieId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore durante la query: ' + err });
    }
    res.json(results);
  });
};

const storeReview = (req, res) => {
  const {id} = req.params;
  const {text,name,vote}= req.body;
  const sql = 'INSERT INTO reviews (movie_id, text, name, vote) VALUES (?, ?, ?, ?)';
  connection.query(sql, [id, text, name, vote], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Errore durante l\'inserimento della recensione: ' + err });
    }
    res.status(201).json({ message: 'Recensione aggiunta con successo', id: result.insertId });
  });
};

module.exports = {
  index,
  show,
  getReviews,
  storeReview
};
