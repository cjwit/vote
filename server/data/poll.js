var mongoose = require('mongoose');
var pollSchema = mongoose.Schema({
    name: { type: String, required: true },
//    date: { type: Date, required: true },
//    owner: { type: String, required: true },
	options: Array
});

module.exports = mongoose.model('poll', pollSchema);
