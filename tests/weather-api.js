
const fetch = require('node-fetch');

fetch("https://api.openweathermap.org/data/2.5/weather?q=London&appid=30afbe7b052669005d02529569d9848b")
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => {
    console.log(err)
  });
