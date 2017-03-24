/**
 * Created by artemyel on 15.03.17.
 */
var parseCategory = function (data, callback) {
    var category = [];
    data.d.ShortName.forEach(function (item, i) {
        category.push({"name": item, "sku": data.d.ID[i], "ProductCount": data.d.ProductCount[i]})
    });
    callback(category);
};

module.exports = parseCategory;