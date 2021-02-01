const mongoose = require('mongoose');
const dotenv = require ('dotenv');
const transactionModel = require('./TransactionModel.js');

dotenv.config();

const db = {};

db.url = process.env.DB_CONNECTION;
db.mongoose = mongoose;
db.Transaction = transactionModel(mongoose);

module.exports = { db };

