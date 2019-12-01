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
        type:Number
    }
});

module.exports = mongoose.model('user',userSchema);