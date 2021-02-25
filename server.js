const express = require('express')
const got = require('got')
const app = express()
const slsHttp = require('serverless-http')

// Test APIs
const WHEATHER_API_URL = 'https://weather.node-congress.workshop.epsagon.com/weather'
const NEWS_API_URL = 'https://news.node-congress.workshop.epsagon.com/news'
const FACTS_API_URL = 'https://facts.node-congress.workshop.epsagon.com/facts'

// fetch api helper functions
function getWheather(city = '') {
    const url = `${WHEATHER_API_URL}/${city}`
    return got(url).json().catch(err => console.log(err.message))
} 

function getNews(city = '') {
    const url = `${NEWS_API_URL}/${city}`
    return got(url).json().catch(err => console.log(err))
} 

function getFacts() {
    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDay()
    const url = `${FACTS_API_URL}/${month}/${day}`
    return got(url).text().catch(err => console.log(err))
}

app.get('/digest/:city', async (req, res) => {
    const city = req.params.city
    const [wheather, news, facts] = await Promise.all([getWheather(city), getNews(city), getFacts()])

    res.json({ wheather, news, facts })
})

app.use('*', (req, res) => {
    res.status(404).send('Not Found')
})

// app.listen(5000, () => console.log('App listening on http://localhost:5000'))

module.exports.handler = slsHttp(app)
