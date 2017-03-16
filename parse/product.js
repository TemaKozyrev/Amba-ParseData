/**
 * Created by artemyel on 15.03.17.
 */
var winston = require('winston');
var fs = require('fs');

var parseDescString = function (str) {
    var result = [];
    var tmp = str.split("<li>");
    for (var i = 1; i < tmp.length; i++) {
        result.push(tmp[i].split("<\/li>")[0]);
    }
    return result;
};

var parseSpecString = function(str) {
    var result = {};
    var tmp = str.split("<li><b>");
    for (var i = 1; i < tmp.length; i++) {
        result[tmp[i].split("<\/b>: ")[0].trim()] = tmp[i].split("<\/b>: ")[1].split("<\/li>")[0].trim();
    }
    return result;
};

var parseProduct = function (category, data, callback) {
    if (data === undefined)
        callback({'error': 'undefined data'});
    else {
        data = JSON.parse(data);
        if (data.d.Success == false)
            callback({'error': 'bad request'});
        else {
            winston.log('info', 'SKU-' + data.d.CategoryName);
            if (!fs.existsSync('./tmp/' + category)) {
                fs.mkdirSync('./tmp/' + category);
            }
            var result = {
                "SKU": data.d.Products[0].SKU,
                "Name": data.d.Products[0].Name,
                "Tagline": data.d.Products[0].Tagline,
                "OptionName": data.d.Products[0].OptionName,
                "Desc": parseDescString(data.d.Products[0].Descriptions),
                "Spec": parseSpecString(data.d.Products[0].Specifications),
                "RelatedProducts": []
            };
            if (data.d.Products[0].RelatedProducts != null)
                data.d.Products[0].RelatedProducts.forEach(function (prod) {
                    result.RelatedProducts.push(prod.SKU)
                });
            callback({
                'file': ('tmp/' + category + "/SKU-" + data.d.Products[0].SKU + '.json'),
                'data': result
            })
        }
    }
};

module.exports = parseProduct;