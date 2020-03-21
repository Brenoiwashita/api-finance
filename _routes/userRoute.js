const express = require('express');
const _router = express.Router();
const jwt = require('jwt-simple');
const UserSchema = require('../model/user');

// To get all users
_router.get('/', (req, res) => {
    UserSchema
        .find({}, (err, data) => {
            if (err) {
                console.log(err);
                res.json({
                    mensage: 'error',
                    data: err
                })
            } else {
                if (data.length > 0) {
                    res.json({
                        mensage: 'ok',
                        data: data
                    })
                } else {
                    if (data.length === 0) {
                        res.json({
                            mensage: 'Sem dados',
                            data: data
                        })
                    }
                }
            }
        });
});

// To find user in login 
_router.post('/login', (req, res) => {
    const email = req.body.email;
    const passWord = req.body.passWord;
    UserSchema
        .findOne({ email: email, passWord: passWord}, (err, data) => {
            if (data) {
                return res.json({
                    mensage: 'ok',
                    data: data
                })
            } else {
                if (err) {
                    return res.json({
                        mensage: 'error',
                        data: err
                    })
                }
            }

            if (data === null) {
                return res.json({
                    mensage: 'error',
                    data: "Usuario nao encontrado"
                })
            }
        });
});

// To create new user
_router.post('/', (req, res) => {
    const body = req.body;
    const reqEmail = req.body.email;
    UserSchema
        .findOne({ email: reqEmail }, (err, data) => {
            if (!data) {
                var secret = reqEmail+req.body.passWord;
                const token = jwt.encode(secret, '###');
                body.token = token;
                UserSchema.create(body, (err, data) => {
                    if (err) {
                        return res.json({
                            mensage: 'error',
                            data: err
                        })
                    } else {
                        return res.json({
                            mensage: 'ok',
                            data: data
                        })
                    }
                });
            } else {
                res.json({
                    mensage: 'Email existente',
                    data: ''
                })
            }

            if (err) {
                res.json({
                    mensage: 'error',
                    data: err
                })
            }
        })
});

// To edit user created
_router.put('/', (req, res) => {
    const body = req.body;
    const email = req.body.email;
    const token = req.body.token;

    UserSchema
        .updateOne({ email: email, token: token }, body, (err, data) => {
            if (data) {
                res.json({
                    mensage: 'ok',
                    data: data
                })
            } else {
                res.json({
                    mensage: 'error',
                    data: err
                })
            }
        })
});

// To delete user created
_router.delete('/', (req, res) => {
    const email = req.body.email;
    const token = req.body.token;

    UserSchema
        .deleteOne({ email: email, token: token }, (err, data) => {
            if (data) {
                res.json({
                    mensage: 'ok',
                    data: data
                })
            } else {
                if (err) {
                    res.json({
                        mensage: 'error',
                        data: err
                    })
                }
            }
        })
});



module.exports = _router;