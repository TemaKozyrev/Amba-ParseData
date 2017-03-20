/**
 * Created by artemyel on 13.03.17.
 */

var async = require('async');
var winston = require('winston');

var makePageTask = require('./data/page');
var getCategory = require('./data/category');

var mongoose = require('mongoose');
mongoose.connect('mongodb://tema:tema@ds141209.mlab.com:41209/amba');

async.waterfall([
    getCategory,
    makePageTask
], function (err, result) {

});
