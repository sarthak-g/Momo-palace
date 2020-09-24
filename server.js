const express = require('express');
const app = express();
const path = require('path')
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

const url = 'mongodb://localhost/momo';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true, useFindAndModify: true });
const connection = mongoose.connection;
connection
    .once('open', () => {
        console.log('Database connected...')
    })
    .catch(err => {
        console.log('Connection Failed...')
    })

app.use(express.static('public'))

// set template engine 
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app);

app.listen(3000, () => {
    console.log(`listening on port ${PORT}`)
})
