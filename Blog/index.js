const express = require('express');
const authMiddleware = require('./auth');
const path = require('path');

const app = express();
const port = 5173;

app.get('/admin.html', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});