let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    regNo:{
        type: String
    },
    email:{
        type: String
    },
    phone:{
        type: String
    },
    password:{
        type: String
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'quiz',
        default: null
    },
    selected:{
        type:Number,
        default: 0
    }
});

/** selected: 0 (not evaluated), 1(no), 2(yes) */

module.exports = mongoose.model('user',userSchema);