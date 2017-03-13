/**
 * Created by artemyel on 13.03.17.
 */
var request = require('request');
var fs = require('fs');
var jsonfile = require('jsonfile');
var categoryFile = 'tmp/category.json';
var categoryUrl = 'https://www.fasttech.net/support/ws/API.ashx?get=subcategories&CategoryID=3099';
var category = require('./tmp/category.json');
var async = require('async');

var parsePage = function (data, callback) {
    // console.log(data.d.CategoryID + ': ' + data.d.CurrentPageIndex);
    if (data === undefined)
        callback({'error': 'undefined data'});
    else {
         data = JSON.parse(data);
        if (data.d.Success == false)
            callback({'error': 'bad request'});
        else {
            console.log(data.d.CategoryID + ': ' + data.d.CurrentPageIndex);
            if (!fs.existsSync('./tmp/' + data.d.CategoryID)) {
                fs.mkdirSync('./tmp/' + data.d.CategoryID);
            }
            callback({'file': ('tmp/' + data.d.CategoryID + "/Page" + data.d.CurrentPageIndex + '.json'), 'data': data})
        }
    }
};

var parseCategory = function (data, callback) {
    var category = [];
    data.d.ShortName.forEach(function (item, i) {
        category.push({"ShortName": item, "ID": data.d.ID[i], "ProductCount": data.d.ProductCount[i]})
    });
    callback({'file': categoryFile, 'data': category});
};



function getCategory() {
    request(categoryUrl, function (error, response, body) {
        parseCategory(JSON.parse(body), function (category) {
            jsonfile.writeFile(category.file, category.data)
        })
    })
}

var getData = async.queue(function (task, callback) {
    request(task.url, function (err, res, body) {
        parsePage(body, function (resultPage) {
            if (resultPage.error)
                console.log(resultPage.error + ': ' + tmpUrl);
            else
                jsonfile.writeFile(resultPage.file, resultPage.data)
        });
        callback();
    })
}, 5);

for (var i = 0; i < category.length; i++) {
    for (var j = 0; j <= Math.floor(category[i].ProductCount / 20); j++) {
        getData.push({url: 'https://www.fasttech.net/support/ws/API.ashx?get=products&CategoryID=' + category[i].ID + '&API=1&SKU=0&PageIndex=' + j + '&SearchKeywords=&Filters=&SortOption='})
    }
}