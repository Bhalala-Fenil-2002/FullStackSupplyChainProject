const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const MyBrand = mongoose.Schema({
    brand: { type: String, required: true, unique: true },
    status: { type: Number, required: true },
    // createdAt: 'created_at'
});

MyBrand.plugin(uniqueValidator);

const MYBRAND = mongoose.model('my_brand', MyBrand);

module.exports = MYBRAND;