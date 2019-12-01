let mongoose = require('mongoose');

let questionSchema = new mongoose.Schema({
    question:{
        type: String
    },
    type:{
        type: String
    },
    domain:{
        type: String
    },
    domainDecider: {
        type: Boolean
    },
    mcqOptions:[
        {
            option:{
                type: String
            }
        }
    ]
});

module.exports = mongoose.model('question',questionSchema);