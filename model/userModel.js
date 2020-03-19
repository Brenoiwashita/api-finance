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
    name: {type: String},
    email: {type: String, unique: true},
    passWord: {type: String},
    token: {type: String, unique: true},
    salary: {type: SalarySchema},
    debtSchema: [{type: debtSchema}],
    addValue: [{type: addValueSchema}]
});

module.exports = mongoose.model('User', UserSchema); 