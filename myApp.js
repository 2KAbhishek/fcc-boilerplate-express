require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log(req.method, req.path, " - ", req.ip);
    next();
})

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', (req, res) => {
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({ message: 'Hello json'.toUpperCase() });
    } else {
        res.json({ message: 'Hello json' });
    }
});

const curTime = (req, res, next) => {
    req.time = new Date().toString();
    next();
};

app.get('/now', curTime, (req, res) => res.send({ time: req.time }));

app.get('/:word/echo', (req, res) => res.json({ echo: req.params.word }));

app.route('/name')
    .get((req, res) => res.json({ name: `${req.query.first} ${req.query.last}` }))
    .post((req, res) => res.json({ name: `${req.body.first} ${req.body.last}` }));

module.exports = app;
