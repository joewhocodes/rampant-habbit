const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(
    'mongodb+srv://joe:test@habits.9o0tigu.mongodb.net/?retryWrites=true&w=majority',
    { useUnifiedTopology: true }
)
    .then((client) => {
        console.log('Connected to Database');
        const db = client.db('rampant-habit');
        const habitCollection = db.collection('habits');
        app.use(bodyParser.urlencoded({ extended: true }));
        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html');
        });
        app.post('/habits', (req, res) => {
            habitCollection.insertOne(req.body)
            .then(result => {
                console.log(result)
            })
            .catch(error => console.error(error))
        });
        app.listen(3000, () => {
            console.log('listening on 3000');
        });
    })
    .catch((error) => console.error(error));
