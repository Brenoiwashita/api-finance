const express = require('express');
const mongoose = require('mongoose');
const app = express();
const indexRouter = require('./_routes/userRoute');
const http = require('http');
 // mongo config
const passwordMongo = '1Y7xVd4RFCmjZm9Y';
const urlMongo = 'mongodb+srv://breno123:'+passwordMongo+'@cluster0-bycmm.mongodb.net/test?retryWrites=true&w=majority';
const options = { poolSize: 5, useUnifiedTopology: true, useNewUrlParser: true};

// start mongo
mongoose.connect(urlMongo, options);
mongoose.set('useCreateIndex', true);

// express use
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', indexRouter);

//port
http.createServer(app).listen(3000);

console.log('Rodando na porta ' + 3000);


module.exports = app;
