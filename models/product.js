/**
 * Created by artemyel on 16.03.17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    sku: String,
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
    spec: [{name: String, value: String}],
    relatedProducts: [{sku: String}]

});

var categorySchema = new Schema({
    sku: String,
    name: String,
    shortName: String,
    products: [productSchema]
});

module.exports = mongoose.model('Category', categorySchema);