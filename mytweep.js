const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 8000;

// Enable CORS for all routes
app.use(cors());

app.get('/data', cors(), (req, res, next) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) return next(err);
    res.send(data);
  });
});

app.get('*', (req, res, next) => {
   const queryParam = req.query.content;
   if (queryParam) {
     const data = { state: queryParam };
     fs.writeFile('data.json', JSON.stringify(data), (err) => {
       if (err) return next(err);
       res.status(200).send('Data received and written!');
     });
   } else {
     res.status(200).send('No content query received.');
   }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

