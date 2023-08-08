const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);
const uniqueValidator = require('mongoose-unique-validator');

const MyProduct = mongoose.Schema({
    product: { type: String, required: true },
    category: { type: Number, required: true },
    brand: { type: Number, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    skus: { type: String, required: true },
    code: { type: String, required: true },
    details: { type: String, required: true },
    images: { type: String, required: true },
    status: { type: Number, required: true },
    // proId: Number
});

// MyProduct.plugin(AutoIncrement, { inc_field: 'product_id' });

MyProduct.plugin(uniqueValidator);

const MYPRODUCT = mongoose.model('my_products', MyProduct);

module.exports = MYPRODUCT;