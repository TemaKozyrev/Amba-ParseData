/**
 * Created by artemyel on 15.03.17.
 */
var winston = require('winston');
var fs = require('fs');

var parseDescString = function (str) {
    var result = [];
    var tmp = str.split("<li>");
    for (var i = 1; i < tmp.length; i++) {
        result.push({value: tmp[i].split("<\/li>")[0]});
    }
    return result;
};

var parseSpecString = function(str) {
    var result = [];
    var tmp = str.split("<li><b>");
    for (var i = 1; i < tmp.length; i++) {
        result.push({
            name: tmp[i].split("<\/b>: ")[0].trim(),
            value: tmp[i].split("<\/b>: ")[1].split("<\/li>")[0].trim()
        })
    }
    return result;
};

var parseProduct = function (category, data, callback) {
    if (data === undefined)
        callback({'error': 'undefined data'});
    else {
        try {
            data = JSON.parse(data);
        } catch(err) {
            callback({'error': 'cant parse json'});
        }
        if (data.d.Success == false)
            callback({'error': 'bad request'});
        else {
            winston.log('info', 'SKU-' + data.d.CategoryName);
            if (!fs.existsSync('./tmp/' + category)) {
                fs.mkdirSync('./tmp/' + category);
            }
            var result = {
                "sku": data.d.Products[0].SKU,
                "name": data.d.Products[0].Name,
                "tagline": data.d.Products[0].Tagline,
                "optionName": data.d.Products[0].OptionName,
                "desc": parseDescString(data.d.Products[0].Descriptions),
                "spec": parseSpecString(data.d.Products[0].Specifications),
                "relatedProducts": [],
                "filters": []
            };
            if (data.d.Products[0].RelatedProducts != null)
                data.d.Products[0].RelatedProducts.forEach(function (prod) {
                    result.relatedProducts.push({'sku': prod.SKU})
                });
            callback({cat: category, prod: result})
        }
    }
};

module.exports = parseProduct;