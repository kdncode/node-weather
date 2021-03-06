
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const apiKey = '7be5cee53b873db905098ce620e5de18';  // Replace with your API

app.set('port', (process.env.PORT || 5000));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Hmmm... That is not a city name 🤔'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Hmmm... That is not a city name 🤔'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
