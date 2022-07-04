const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://joe:test@habits.9o0tigu.mongodb.net/?retryWrites=true&w=majority', (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
})

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, () => {
    console.log('listening on 3000')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/habits', (req, res) => {
    console.log(req.body)
})