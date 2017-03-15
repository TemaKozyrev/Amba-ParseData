/**
 * Created by artemyel on 15.03.17.
 */
var async = require('async');
var request = require('request');
var parsePage = require('../parse/page');
var jsonfile = require('jsonfile');
var winston = require('winston');

var getProductData = async.queue(function (task, callback) {

});

function makeProductTask() {

}

module.exports = makeProductTask;