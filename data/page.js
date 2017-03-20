/**
 * Created by artemyel on 15.03.17.
 */
var async = require('async');
var request = require('request');
var parsePage = require('../parse/page');
var jsonfile = require('jsonfile');
var winston = require('winston');
var makeProductTask = require('./product');

var getPageData = async.queue(function (task, callback) {
    request(task.url, function (err, res, body) {
        parsePage(body, function (resultPage) {
            if (resultPage.error) {
                winston.log('error', resultPage.error + ': ' + task.url);
                callback();
            }
            else
                makeProductTask(resultPage.data, function () {
                    callback();
                })
        });
    })
}, 1);

function makePageTask(category, callback) {
    for (var i = 0; i < category.length; i++) {
        for (var j = 0; j <= Math.floor(category[i].ProductCount / 20); j++) {
            getPageData.push({url: 'https://www.fasttech.net/support/ws/API.ashx?get=products&CategoryID=' + category[i].sku + '&API=1&SKU=0&PageIndex=' + j + '&SearchKeywords=&Filters=&SortOption='})
        }
    }
    callback(null);
}

module.exports = makePageTask;