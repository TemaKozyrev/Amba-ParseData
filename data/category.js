/**
 * Created by artemyel on 15.03.17.
 */
var request = require('request');
var parseCategory = require('../parse/category');
var categoryUrl = 'https://www.fasttech.net/support/ws/API.ashx?get=subcategories&CategoryID=3099';

function getCategory(callback) {
    request(categoryUrl, function (error, response, body) {
        parseCategory(JSON.parse(body), function (category) {
            callback(null, category)
        })
    })
}

module.exports = getCategory;