// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

// CORS Middleware - This should be added before any route handling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with your frontend domain if needed
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Route to handle GET requests for posts
app.get('/routes/posts', (req, res) => {
  res.json(posts);
});

// Route to handle POST requests
app.post('/routes/posts', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);

  res.status(201).json(newPost);
});

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

// CORS configuration options
const corsOptions = {
  origin: 'http://localhost:3001', // Replace with your frontend URL
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
};

// Middleware
app.use(cors(corsOptions)); // Apply CORS with specified options
app.use(express.json()); // Middleware to parse JSON bodies

// Define a route to get posts
app.get('/routes/posts', (req, res) => {
  pool.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results); // Send the results as JSON
  });
});

// Route to get all posts (optional, for demonstration)
app.get('/routes/posts', (req, res) => {
  res.json(posts);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
