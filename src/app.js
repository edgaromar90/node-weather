const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Edgar Henriquez'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Edgar Henriquez'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Edgar Henriquez',
    message: 'Get some help in this page'
  })
})

app.get('/weather', (req, res) => {
  const { address } = req.query
  if (!address) {
    return res.send({
      error: 'address must be provided',
    })
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }

      res.send({
        location,
        forecast: forecastData,
        address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('pageNotFound', {
    title: 'Help article not found',
    message: 'Seems like you were looking for help',
    name: 'Edgar Henriquez'
  })
})

app.get('*', (req, res) => {
  res.render('pageNotFound', {
    title: 'Page not Found',
    message: 'You tried to access a page that doesn\'t exist',
    name: 'Edgar Henriquez'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})