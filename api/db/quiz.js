let mongoose = require('mongoose');

let quizSchema = new mongoose.Schema({
    resp: [
        {
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'question'
            },
            answer: {
                type: String
            }
        }
    ],
    grade: {
        type: Number,
        default: 0
    },
    submitted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
});

module.exports = mongoose.model('quiz',quizSchema);