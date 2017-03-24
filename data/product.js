/**
 * Created by artemyel on 15.03.17.
 */
var async = require('async');
var request = require('request');
var jsonfile = require('jsonfile');
var winston = require('winston');
var parseProduct = require('../parse/product');
var save = require('../models/save');

var getProductData = async.queue(function (task, callback) {
    request(task.url, function (err, res, body) {
        parseProduct(task.category, body, function (resultProduct) {
            if (resultProduct.error) {
                winston.log('error', resultProduct.error + ': ' + task.url);
                callback();
            }
            else
                save(resultProduct, function(err) {
                    if (err)
                        winston.log('error', err)
                    callback()
                })
        });
    })
}, 1);

function makeProductTask(page, callback) {
    async.forEachOf(page.Products, function (item, key, callback) {
        getProductData.push({
            url: 'https://www.fasttech.net/support/ws/API.ashx?get=products&CategoryID=-1&API=1&SKU='
            + item + '&PageIndex=-1&SearchKeywords=&Filters=&SortOption=',
            category: page.CategoryID
        });
        callback();
    }, function (err) {
        callback();
    })
}

module.exports = makeProductTask;