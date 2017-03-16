/**
 * Created by artemyel on 13.03.17.
 */

var async = require('async');
var winston = require('winston');

var makePageTask = require('./data/page');
var getCategory = require('./data/category');


async.waterfall([
    getCategory,
    makePageTask
], function (err, result) {

});