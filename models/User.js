const mongooose = require('mongoose');

const UserSchema = new mongooose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: '',
    }
}, { timestamps: true }
);

module.exports = mongooose.model('User', UserSchema);