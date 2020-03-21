const express = require('express');
const mongoose = require('mongoose');
const app = express();
const indexRouter = require('./_routes/userRoute');
const bodyParser = require('body-parser');


 // mongo config
const passwordMongo = '1Y7xVd4RFCmjZm9Y';
const urlMongo = 'mongodb+srv://breno123:'+passwordMongo+'@cluster0-bycmm.mongodb.net/test?retryWrites=true&w=majority';
const options = { poolSize: 5, useUnifiedTopology: true, useNewUrlParser: true};

// start mongo
mongoose.connect(urlMongo, {useNewUrlParser: true});
mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err)});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// express use
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', indexRouter);

//port
app.listen(process.env.PORT || 3000)

console.log('Rodando na porta ' + 3000);


module.exports = app;
