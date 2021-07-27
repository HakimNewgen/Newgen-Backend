const mongoose = require('mongoose')


const questionschema = new mongoose.Schema({
    service: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },
    



})








module.exports = mongoose.model('question', questionschema)