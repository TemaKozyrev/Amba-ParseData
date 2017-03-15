/**
 * Created by artemyel on 15.03.17.
 */
var winston = require('winston');
var fs = require('fs');

var parsePage = function (data, callback) {
    if (data === undefined)
        callback({'error': 'undefined data'});
    else {
        data = JSON.parse(data);
        if (data.d.Success == false)
            callback({'error': 'bad request'});
        else {
            winston.log('info', 'Category-' + data.d.CategoryID + ': Page-' + data.d.CurrentPageIndex);
            if (!fs.existsSync('./tmp/' + data.d.CategoryID)) {
                fs.mkdirSync('./tmp/' + data.d.CategoryID);
            }
            var result = {"CategoryID": data.d.CategoryID, "Products": []};
            data.d.Products.forEach(function (prod) {
                result.Products.push(prod.SKU)
            });
            callback({'file': ('tmp/' + data.d.CategoryID + "/Page" + data.d.CurrentPageIndex + '.json'), 'data': result})
        }
    }
};

module.exports = parsePage;