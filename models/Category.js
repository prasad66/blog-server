const mongooose = require('mongoose');

const CatrgorySchema = new mongooose.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true }
);

module.exports = mongooose.model('Catrgory', CatrgorySchema);