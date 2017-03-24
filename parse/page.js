/**
 * Created by artemyel on 15.03.17.
 */
var winston = require('winston');
var fs = require('fs');
var parseJSON = require('../helpful/parseJSON');
var async = require('async');

var parsePage = function (data, callback) {
    if (data === undefined)
        callback({ 'error': 'undefined data' });
    else {
        parseJSON(data).then(
            function (data) {
                if (data.d.Success == false)
                    callback({ 'error': 'bad request' });
                else {
                    winston.log('info', 'Category-' + data.d.CategoryID + ': Page-' + data.d.CurrentPageIndex);
                    var result = { "CategoryID": data.d.CategoryID, "Products": [] };
                    
                    async.forEachOf(data.d.Products, function (item, key, callback) {
                        result.Products.push(item.SKU);
                        callback();
                    }, function (err) {
                        callback({ 'category': data.d.CategoryID, data: result })
                    })
                }
            }, function (error) {
                callback({ 'error': error });
            }
        )
    }
};

module.exports = parsePage;