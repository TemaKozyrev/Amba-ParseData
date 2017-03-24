var parseJSON = function (data) {
    return new Promise(function (fulfill, reject) {
        try {
            data = JSON.parse(data);
        } catch (err) {
            var error = 'cant parse json';
            reject(error);
        } finally {
            fulfill(data);
        };
    });
};

module.exports = parseJSON;