const express = require('express');
const port = 3000;
const app = express();
const path = require('path');
const axios = require('axios');

app.use(express.static('public'));
app.use(express.json());

let url = `https://api.datamuse.com`

// app.get('/query', (req, res) => {

// })

app.use(express.static('./dist'));
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})          