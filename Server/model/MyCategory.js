const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const MyCategory = mongoose.Schema({
    category: { type: String, required: true, unique: true },
    brand: [{ type: mongoose.Schema.Types.ObjectId, ref: 'my_brand', required: true }],
    status: { type: Number, required: true },
});

MyCategory.plugin(uniqueValidator);

const MYCATEGORY = mongoose.model('my_category', MyCategory);

module.exports = MYCATEGORY;

