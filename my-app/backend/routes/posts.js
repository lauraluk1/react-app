const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mysql',
});

connection.connect();

// Route to get all posts
router.get('/routes/posts', (req, res) => {
  connection.query('SELECT * FROM posts', (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
    res.json(results);
  });
});

// Route to create a new post
router.post('/routes/posts/', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';
  connection.query(query, [title, content], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error creating post', error: error.message });
    }
    res.status(201).json({ id: results.insertId, title, content });
  });
});

module.exports = router;
