var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var filterSchema = new Schema({
    _catId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Category'
    },
    name: String
})

module.exports = mongoose.model('Filter', filterSchema);