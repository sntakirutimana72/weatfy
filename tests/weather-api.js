
const fetch = require('node-fetch');

fetch("https://api.openweathermap.org/data/2.5/weather?q=London&appid={api key}")
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => {
    console.log(err)
  });
