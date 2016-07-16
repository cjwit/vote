var mongoose = require('mongoose');
var thingSchema = mongoose.Schema({
    name: { type: String, required: true },
    // location: { type: String, required: true },
    // description: { type: String, required: true },
    // date: { type: Date, required: true }
});

module.exports = mongoose.model('thing', thingSchema);
