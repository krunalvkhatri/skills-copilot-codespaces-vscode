// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/comments', (req, res) => {
  fs.readFile(path.join(__dirname, 'comments.json'), 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Server error');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.post('/comments', (req, res) => {
  fs.readFile(path.join(__dirname, 'comments.json'), 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Server error');
      return;
    }

    const comments = JSON.parse(data);
    const newComment = req.body;

    comments.push(newComment);

    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send('Server error');
        return;
      }
      res.json(comments);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});