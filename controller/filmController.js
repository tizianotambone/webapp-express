const express = require('express');
const connection = require('../data/data');

const index = (req, res) => { 
    connection.query('SELECT * FROM movies', (err, movieResults) => {
        if (err) return res.status(500).json({error:'Error retrieving movies'+ err});
        res.json(movieResults);
    });
  }

  const show = (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM movies';

  connection.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Errore durante la query: ' + err });
    }

    if (result.length <= 0) {
      return res.status(404).json({ error: 'Film non trovato' });
    }

    res.json(result[0]);
  });
};

const getReviews = (req, res) => {
  const movieId = req.params.id;
  const sql = 'SELECT * FROM reviews';

  connection.query(sql, [movieId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore durante la query: ' + err });
    }
    res.json(results);
  });
};




module.exports = {
  index,
  show,
  getReviews,
  
};