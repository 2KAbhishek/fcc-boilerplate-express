require('dotenv').config();
var express = require('express');
var app = express();

app.use((req, res, next) => {
    console.log(req.method, req.path, " - ", req.ip);
    next();
})

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

app.get('/name', (req, res) => res.json({ name: `${req.query.first} ${req.query.last}` }));

module.exports = app;
