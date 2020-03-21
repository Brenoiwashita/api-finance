const mongoose = require('mongoose');
const schema = mongoose.Schema;

const SalarySchema = new schema ({
    value: {type: Number},
    date: {type: String} 
});

const debtSchema = new schema ({
    dueDate: {type: String},
    value: {type: Number},
    type: {type: String}
});

const addValueSchema = new schema ({
    value: {type: String},
    date: {type: String},
    type: {type: String}
});

const UserSchema = new schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    passWord: {type: String, required: true},
    token: {type: String, unique: true},
    salary: {type: SalarySchema, required: true},
    dateBirth : {type: String, required: true},
    debtSchema: [{type: debtSchema}],
    addValue: [{type: addValueSchema}]
});

module.exports = mongoose.model('User', UserSchema); 