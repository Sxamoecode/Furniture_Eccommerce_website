const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        unique: false
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('User', userSchema);