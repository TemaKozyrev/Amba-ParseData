/**
 * Created by artemyel on 15.03.17.
 */
var async = require('async');
var request = require('request');
var jsonfile = require('jsonfile');
var winston = require('winston');
var parseProduct = require('../parse/product');

var getProductData = async.queue(function (task, callback) {
    request(task.url, function (err, res, body) {
        parseProduct(task.category, body, function (resultProduct) {
            if (resultProduct.error)
                winston.log('error', resultProduct.error + ': ' + task.url);
            else
                jsonfile.writeFile(resultProduct.file, resultProduct.data)
        });
        callback()
    })
}, 5);

function makeProductTask(page) {
    for (var i = 0; i < page.Products.length; i++) {
        getProductData.push({
            url: 'https://www.fasttech.net/support/ws/API.ashx?get=products&CategoryID=-1&API=1&SKU='
            + page.Products[i] + '&PageIndex=-1&SearchKeywords=&Filters=&SortOption=',
            category: page.CategoryID
        })
    }
}

module.exports = makeProductTask;