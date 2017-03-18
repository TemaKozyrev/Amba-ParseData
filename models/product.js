/**
 * Created by artemyel on 16.03.17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    SKU: Number,
    name: String,
    tagline: String,
    optionName: String,
    desc: [{value: String}],
    filters: [{
        _filterId: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: 'Filter'
        },
        value: String
    }],
    spec: [{type: String, value: String}],
    relatedProducts: [{SKU: String}]

});

var categorySchema = new Schema({
    name: String,
    shortName: String,
    products: [productSchema],
    filters: [{name: String}]
});

module.exports = mongoose.model('Category', categorySchema);