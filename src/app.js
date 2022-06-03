const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set handlebars engine and views location
app.set('view engine', 'hbs'); //handle bars
app.set('views', viewsPath); //handle bars
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Senthil',
    creator: 'Kishore',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Not about me',
    name: 'Senthil',
    creator: 'Kishore',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'Health is wealth',
    title: 'Help',
    name: 'Kishore Kumar',
    creator: 'Kishore',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'Address must be provided' });
  }

  const location = req.query.address;

  geocode(location, (error, { lattitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(lattitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      return res.send({
        forecast: forecastData,
        location,
        address: location,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'You must provide a search term' });
  }
  res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
  res.render('pageNotFound', {
    title: '404',
    errorMessage: 'Help article not found',
    creator: 'Kishore',
  });
});
app.get('*', (req, res) => {
  res.render('pageNotFound', {
    title: '404',
    errorMessage: 'Page not found',
    creator: 'Kishore',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
