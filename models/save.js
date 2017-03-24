var mongoose = require('mongoose');
var Category = require('./product');
var Filter = require('./filter');
var async = require('async');

function save(data, callback) {
    async.waterfall([
        async.apply(createData, data),
        collectProductFilters,
        function (prod, cat, callback) {
            cat.products.push(prod);
            callback(null, cat);
        },
        function (cat) {
            cat.save(function (err) {
                callback(null);
            });
        }
    ], function (err, result) {
        if (err)
            callback(err.err);
        else 
            callback();
    });
}

function createData(data, callback) {
    Category.findOne({ 'sku': data.cat }, function (err, category) {
        callback(null, data.prod, category)
    })
}

function collectProductFilters(prod, category, callback) {
    if (category._id == undefined || category._id == null) 
        callback({err: 'undefined category _id'})
    else 
        Category.findOne({ 'products.sku': prod.sku }, { 'products.$': 1 }, function (err, cat) {
            if (cat != null)
                callback({ err: 'exsist product' })
            else {
                async.forEachOf(prod.spec, function (item, key, callback) {
                    Filter.findOne({ '_catId': category._id, 'name': item.name }, function (err, filter) {
                        if (filter == null) {
                            filter = new Filter({ '_catId': category._id, 'name': item.name });
                            prod.filters.push({ '_filterId': filter._id, value: item.value });
                            filter.save(function (err) {
                                callback();
                            });
                        } else {
                            prod.filters.push({ '_filterId': filter._id, value: item.value });
                            callback();
                        };
                    })
                }, function (err) {
                    callback(null, prod, category)
                })
            }
        })
    }

module.exports = save;