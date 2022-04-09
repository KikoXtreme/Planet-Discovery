const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const planetSchema = new mongoose.Schema({
    planetName: {
        type: String,
        required: true
    },
    subscribers: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
    posts: [{
        type: ObjectId,
        ref: "Post"
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Planet', planetSchema);