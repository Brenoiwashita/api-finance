const express = require('express');
const _router = express.Router();
const UserSchema = require('../model/userModel');

function methodSend(status, data, res) {
    if (status) {
        return res.json({
            response: 'ok',
            data: data
        });
    } else {
        return res.json ({
            response: 'error',
            data: data
        });
    }
}

function methodCreate(condition, body, res){
    if (condition) {
        UserSchema
            .create(body, (err, data) => {
                if (err) {
                    methodSend(false, err, res);
                } else {
                    methodSend(true, data, res);
                }
            });
    };
}


// To get all users
_router.get('/', (req, res) => {
  UserSchema
    .find({}, (err, data) => {
        if (err) {
            console.log(err);
            methodSend(false, err, res);
        } else {
            if (data.length > 0) {
                methodSend(true, data, res);
            }
        }
    });
});

// To find user in login 
_router.post('/login', (req, res) => {
    const email = req.body.email;
    const passWord = req.body. passWord;
    UserSchema
        .findOne({email: email, passWord: passWord}, (err, data) =>{
            if (data) {
                methodSend(true, data, res);
            } else {
                if (err) {
                    methodSend(false, err, res);
                }
            }
        });
});

// To create new user
_router.post('/', (req, res) => {
    const body = req.body;
    const reqEmail = req.body.email;
    UserSchema
        .findOne({email: reqEmail }, (err, data) => {
            if(!data) {
                methodCreate(true, body, res);
            } else {
                methodSend(false, 'Email ja existente', res);
            }

            if (err) {
                methodSend(false, err, res);
            }
        })
});

// To edit user created
_router.put('/', (req, res) => {
    const body = req.body;
    const email = req.body.email;
    const token = req.body.token;

    UserSchema
        .updateOne({email: email, token: token}, body, (err, data) => {
            if(data) {
                methodSend(true, data, res);
            } else {
                methodSend(false, err, res);
            }
        })
});

// To delete user created
_router.delete('/', (req, res) => {
   const email = req.body.email;
   const token = req.body.token;

   UserSchema
    .deleteOne({email: email, token: token}, (err, data) => {
        if (data) {
            methodSend(true, 'Deleted with success - '+data, res);
        } else {
            if (err) {
                methodSend(false, err, res);
            }
        }
    })
});



module.exports = _router;