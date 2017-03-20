var mongoose = require('mongoose');
var Category = require('./product');
var winston = require('winston');

function initCategory(data, callback) {
    data.forEach(function (item) {
        Category.findOne({ 'sku': item.sku }, function (err, category) {
            if (category == null) {
                category = new Category({
                    sku: item.sku,
                    name: item.name,
                    shortName: item.name.replace(/ /g, '')
                });
                category.save(function (err) {
                    if (err)
                        winston.log('error', 'cant init category')
                })
            } else {
                winston.log('error', 'exist category')
            }
        })
    })
    callback()
}

module.exports = initCategory;