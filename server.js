const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 3000;
require('dotenv').config();
const { body, validationResult } = require('express-validator');
const session = require('express-session');
const flash = require('connect-flash');

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
app.use(express.json());
app.use(session({
    secret:'geeksforgeeks',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());

app.get('/', (req, res) => {
    db.collection('habits').find().toArray()
        .then(data => {
            res.render('index.ejs', { info: data });
        })
        .catch(error => console.error(error));
});

app.get('/gfg', (req, res) => {
    res.send(req.flash('message'));
});

app.post('/addHabit', (req, res) => {
    console.log(req.body)
    db.collection('habits')
        .insertOne(req.body)
        .then((result) => {
            console.log('Habit added');
            res.redirect('/');
        })
        .catch((error) => console.error(error));
    }
);


app.delete('/deleteHabit', (req, res) => {
    db.collection('habits').deleteOne({ habit: req.body.habit })
        .then((result) => {
            console.log(result)
            res.json('Deleted habit');
            console.log("Deleted habit")
        })
        .catch((error) => console.error(error));
});

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

// .catch((error) => console.error(error));
