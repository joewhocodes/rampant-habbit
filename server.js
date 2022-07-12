const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 3000;
require('dotenv').config();

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'rampant-habit';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`);
        db = client.db(dbName);
    })

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req, res) => {
    db.collection('habits').find().toArray()
        .then(data => {
            res.render('index.ejs', { info: data });
        })
        .catch(error => console.error(error));
});

app.post('/addHabit', (req, res) => {
    db.collection('habits').insertOne(req.body)
    .then((result) => {
        console.log('Habit added')
        res.redirect('/');
    })
        .catch((error) => console.error(error));
});


app.delete('/deleteHabit', (req, res) => {
    db.collection('habits').deleteOne({ name: req.body.name })
        .then((result) => {
            console.log("Deleted habit")
            res.json('Deleted habit');
        })
        .catch((error) => console.error(error));
});

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

// .catch((error) => console.error(error));
