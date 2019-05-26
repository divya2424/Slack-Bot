var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define our user schema
var TodoSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    channel_name: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Todo', TodoSchema);